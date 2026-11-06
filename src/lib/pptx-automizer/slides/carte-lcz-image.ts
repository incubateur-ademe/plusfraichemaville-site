import sharp from "sharp";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";
import { Climadiag } from "@/src/components/climadiag/types";

// Server-side rendering of the carte_lcz picture of the synthese slide 3: the same layers as the
// site's LCZ map (SurchauffeUrbaineLCZMap), cropped on the project's commune.
//  - basemap: Plan IGN from the Géoplateforme WMS, desaturated like the site's mapStyles.desaturated;
//  - LCZ: the Cerema tile cache also used by addLCZLayers, stitched at the zoom matching the
//    output resolution (the cache only goes up to zoom 14, its single-image export renders
//    nothing at commune scale);
//  - commune: its contour from geo.api.gouv.fr, drawn on top with a light veil outside it.
// Everything is computed in Web Mercator (EPSG:3857), the projection of both the tiles and the WMS.

type Position = [number, number];
type Ring = Position[];
type CommuneGeometry = { type: "Polygon"; coordinates: Ring[] } | { type: "MultiPolygon"; coordinates: Ring[][] };
type MercatorBbox = { xmin: number; ymin: number; xmax: number; ymax: number };

const EARTH_HALF_CIRCUMFERENCE_M = 20037508.34;
const TILE_SIZE_PX = 256;
const LCZ_TILE_URL =
  "https://cartagene.cerema.fr/server/rest/services/Hosted/l_lcz_spot_000_2022_tl/MapServer/tile/{z}/{y}/{x}";
const LCZ_MIN_ZOOM = 6;
const LCZ_MAX_ZOOM = 14;
const LCZ_MAX_TILES = 64;
const LCZ_TILE_FETCH_CONCURRENCY = 8;
// Same opacity as the site's lcz-high-layer.
const LCZ_OPACITY = 0.7;
const IGN_WMS_URL = "https://data.geopf.fr/wms-r/wms";
const IGN_WMS_LAYER = "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2";
const FETCH_TIMEOUT_MS = 15000;

// Room left around the commune, as a share of its own size.
const BBOX_PADDING_RATIO = 0.08;
// Half-width of the area shown when the commune's contour is unavailable.
const FALLBACK_HALF_SIZE_M = 4000;
// Pixel width of the generated picture, its height following the carte_lcz shape's ratio.
export const CARTE_LCZ_IMAGE_WIDTH_PX = 1800;

const CONTOUR_COLOR = "#000091";
const CONTOUR_WIDTH_PX = 5;
const OUTSIDE_VEIL_OPACITY = 0.45;

const toMercator = ([lng, lat]: Position): Position => [
  (lng * EARTH_HALF_CIRCUMFERENCE_M) / 180,
  (Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) * EARTH_HALF_CIRCUMFERENCE_M) / Math.PI,
];

const fetchWithTimeout = (url: string) => fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });

const fetchCommuneGeometry = async (codeInsee: string): Promise<CommuneGeometry | null> => {
  const response = await fetchWithTimeout(`https://geo.api.gouv.fr/communes/${codeInsee}?fields=contour`);
  if (!response.ok) return null;
  const commune = (await response.json()) as { contour?: CommuneGeometry };
  return commune.contour ?? null;
};

const getPolygons = (geometry: CommuneGeometry): Ring[][] =>
  geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;

const getBboxOfPoints = (points: Position[]): MercatorBbox =>
  points.reduce<MercatorBbox>(
    (bbox, [x, y]) => ({
      xmin: Math.min(bbox.xmin, x),
      ymin: Math.min(bbox.ymin, y),
      xmax: Math.max(bbox.xmax, x),
      ymax: Math.max(bbox.ymax, y),
    }),
    { xmin: Infinity, ymin: Infinity, xmax: -Infinity, ymax: -Infinity },
  );

/** Pads the bbox, then widens it on one axis so that it has the picture's width / height ratio. */
const fitBboxToRatio = (bbox: MercatorBbox, ratio: number): MercatorBbox => {
  const centerX = (bbox.xmin + bbox.xmax) / 2;
  const centerY = (bbox.ymin + bbox.ymax) / 2;
  let width = (bbox.xmax - bbox.xmin) * (1 + 2 * BBOX_PADDING_RATIO);
  let height = (bbox.ymax - bbox.ymin) * (1 + 2 * BBOX_PADDING_RATIO);
  if (width / height > ratio) {
    height = width / ratio;
  } else {
    width = height * ratio;
  }
  return {
    xmin: centerX - width / 2,
    xmax: centerX + width / 2,
    ymin: centerY - height / 2,
    ymax: centerY + height / 2,
  };
};

const getTileSpanM = (zoom: number) => (2 * EARTH_HALF_CIRCUMFERENCE_M) / 2 ** zoom;

const getTileRange = (bbox: MercatorBbox, zoom: number) => {
  const tileSpan = getTileSpanM(zoom);
  return {
    xMin: Math.floor((bbox.xmin + EARTH_HALF_CIRCUMFERENCE_M) / tileSpan),
    xMax: Math.floor((bbox.xmax + EARTH_HALF_CIRCUMFERENCE_M) / tileSpan),
    yMin: Math.floor((EARTH_HALF_CIRCUMFERENCE_M - bbox.ymax) / tileSpan),
    yMax: Math.floor((EARTH_HALF_CIRCUMFERENCE_M - bbox.ymin) / tileSpan),
  };
};

const countTiles = (range: ReturnType<typeof getTileRange>) =>
  (range.xMax - range.xMin + 1) * (range.yMax - range.yMin + 1);

/** The lowest zoom at least as detailed as the picture, within the cache's zooms and tile budget. */
const chooseLczZoom = (bbox: MercatorBbox, widthPx: number) => {
  const targetResolution = (bbox.xmax - bbox.xmin) / widthPx;
  let zoom = Math.ceil(Math.log2((2 * EARTH_HALF_CIRCUMFERENCE_M) / (TILE_SIZE_PX * targetResolution)));
  zoom = Math.min(Math.max(zoom, LCZ_MIN_ZOOM), LCZ_MAX_ZOOM);
  while (zoom > LCZ_MIN_ZOOM && countTiles(getTileRange(bbox, zoom)) > LCZ_MAX_TILES) {
    zoom--;
  }
  return zoom;
};

const fetchLczTile = async (zoom: number, x: number, y: number): Promise<Buffer | null> => {
  const url = LCZ_TILE_URL.replace("{z}", `${zoom}`).replace("{y}", `${y}`).replace("{x}", `${x}`);
  const response = await fetchWithTimeout(url);
  // Areas outside the LCZ coverage have no tile.
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to fetch LCZ tile ${url} (${response.status})`);
  }
  return Buffer.from(await response.arrayBuffer());
};

/** Stitches the LCZ tiles covering the bbox, crops them to it and scales them to the picture. */
const renderLczLayer = async (bbox: MercatorBbox, widthPx: number, heightPx: number) => {
  const zoom = chooseLczZoom(bbox, widthPx);
  const range = getTileRange(bbox, zoom);
  const tiles: { x: number; y: number }[] = [];
  for (let y = range.yMin; y <= range.yMax; y++) {
    for (let x = range.xMin; x <= range.xMax; x++) {
      tiles.push({ x, y });
    }
  }

  const composites: sharp.OverlayOptions[] = [];
  for (let i = 0; i < tiles.length; i += LCZ_TILE_FETCH_CONCURRENCY) {
    const batch = tiles.slice(i, i + LCZ_TILE_FETCH_CONCURRENCY);
    const buffers = await Promise.all(batch.map(({ x, y }) => fetchLczTile(zoom, x, y)));
    buffers.forEach((buffer, index) => {
      if (!buffer) return;
      composites.push({
        input: buffer,
        left: (batch[index].x - range.xMin) * TILE_SIZE_PX,
        top: (batch[index].y - range.yMin) * TILE_SIZE_PX,
      });
    });
  }

  const mosaicWidth = (range.xMax - range.xMin + 1) * TILE_SIZE_PX;
  const mosaicHeight = (range.yMax - range.yMin + 1) * TILE_SIZE_PX;
  const mosaic = await sharp({
    create: { width: mosaicWidth, height: mosaicHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite(composites)
    .png()
    .toBuffer();

  // Position of the bbox within the mosaic, in mosaic pixels.
  const resolution = getTileSpanM(zoom) / TILE_SIZE_PX;
  const mosaicOriginX = range.xMin * getTileSpanM(zoom) - EARTH_HALF_CIRCUMFERENCE_M;
  const mosaicOriginY = EARTH_HALF_CIRCUMFERENCE_M - range.yMin * getTileSpanM(zoom);
  const left = Math.max(0, Math.round((bbox.xmin - mosaicOriginX) / resolution));
  const top = Math.max(0, Math.round((mosaicOriginY - bbox.ymax) / resolution));
  const width = Math.min(mosaicWidth - left, Math.round((bbox.xmax - bbox.xmin) / resolution));
  const height = Math.min(mosaicHeight - top, Math.round((bbox.ymax - bbox.ymin) / resolution));

  return sharp(mosaic)
    .extract({ left, top, width, height })
    .resize(widthPx, heightPx, { fit: "fill" })
    .ensureAlpha()
    .linear([1, 1, 1, LCZ_OPACITY], [0, 0, 0, 0])
    .png()
    .toBuffer();
};

const renderBasemap = async (bbox: MercatorBbox, widthPx: number, heightPx: number) => {
  const params = new URLSearchParams({
    SERVICE: "WMS",
    VERSION: "1.3.0",
    REQUEST: "GetMap",
    LAYERS: IGN_WMS_LAYER,
    STYLES: "",
    CRS: "EPSG:3857",
    BBOX: [bbox.xmin, bbox.ymin, bbox.xmax, bbox.ymax].join(","),
    WIDTH: `${widthPx}`,
    HEIGHT: `${heightPx}`,
    FORMAT: "image/png",
  });
  const response = await fetchWithTimeout(`${IGN_WMS_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch IGN basemap (${response.status})`);
  }
  return sharp(Buffer.from(await response.arrayBuffer()))
    .modulate({ saturation: 0 })
    .png()
    .toBuffer();
};

/** SVG overlay: a veil outside the commune, cut out with evenodd, and the commune's contour. */
const renderCommuneOverlay = (polygons: Ring[][], bbox: MercatorBbox, widthPx: number, heightPx: number) => {
  const toPixel = ([x, y]: Position) => {
    const pixelX = ((x - bbox.xmin) / (bbox.xmax - bbox.xmin)) * widthPx;
    const pixelY = ((bbox.ymax - y) / (bbox.ymax - bbox.ymin)) * heightPx;
    return `${pixelX.toFixed(1)},${pixelY.toFixed(1)}`;
  };
  const communePath = polygons
    .flat()
    .map((ring) => `M${ring.map((point) => toPixel(toMercator(point))).join("L")}Z`)
    .join("");
  const imageRectPath = `M0,0H${widthPx}V${heightPx}H0Z`;

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${widthPx}" height="${heightPx}">` +
      `<path d="${imageRectPath}${communePath}" fill="white" fill-opacity="${OUTSIDE_VEIL_OPACITY}" ` +
      `fill-rule="evenodd"/>` +
      `<path d="${communePath}" fill="none" stroke="${CONTOUR_COLOR}" stroke-width="${CONTOUR_WIDTH_PX}" ` +
      `stroke-linejoin="round"/>` +
      `</svg>`,
  );
};

const getClimadiagCenter = (climadiagInfo: Climadiag): Position | null => {
  const coordinates = (climadiagInfo.adresse_all_infos as unknown as GeoJsonAdresse | undefined)?.geometry?.coordinates;
  return coordinates && coordinates[0] && coordinates[1] ? [coordinates[0], coordinates[1]] : null;
};

/**
 * Renders the LCZ map of the commune as a PNG of `widthPx` × `widthPx / ratio`. Falls back to an
 * area around the climadiag's address, without contour, when geo.api.gouv.fr has no contour.
 * Returns null when there is nothing to center the map on. Throws if a map service fails.
 */
export const renderCarteLczImage = async ({
  codeInsee,
  climadiagInfo,
  ratio,
  widthPx = CARTE_LCZ_IMAGE_WIDTH_PX,
}: {
  codeInsee: string;
  climadiagInfo: Climadiag;
  ratio: number;
  widthPx?: number;
}): Promise<Buffer | null> => {
  const heightPx = Math.round(widthPx / ratio);

  const geometry = await fetchCommuneGeometry(codeInsee).catch(() => null);
  const polygons = geometry ? getPolygons(geometry) : [];
  let communeBbox: MercatorBbox;
  if (polygons.length > 0) {
    communeBbox = getBboxOfPoints(polygons.flat(2).map(toMercator));
  } else {
    const center = getClimadiagCenter(climadiagInfo);
    if (!center) return null;
    const [x, y] = toMercator(center);
    communeBbox = {
      xmin: x - FALLBACK_HALF_SIZE_M,
      xmax: x + FALLBACK_HALF_SIZE_M,
      ymin: y - FALLBACK_HALF_SIZE_M,
      ymax: y + FALLBACK_HALF_SIZE_M,
    };
  }
  const bbox = fitBboxToRatio(communeBbox, ratio);

  const [basemap, lczLayer] = await Promise.all([
    renderBasemap(bbox, widthPx, heightPx),
    renderLczLayer(bbox, widthPx, heightPx),
  ]);

  const overlays: sharp.OverlayOptions[] = [{ input: lczLayer }];
  if (polygons.length > 0) {
    overlays.push({ input: renderCommuneOverlay(polygons, bbox, widthPx, heightPx) });
  }
  // A palette PNG keeps the pptx light: the full-colour one weighs several MB.
  return sharp(basemap).composite(overlays).png({ palette: true, quality: 90 }).toBuffer();
};
