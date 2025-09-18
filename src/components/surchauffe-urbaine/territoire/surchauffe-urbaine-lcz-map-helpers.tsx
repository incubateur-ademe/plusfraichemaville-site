"use client";

import maplibregl, { MapLayerMouseEvent } from "maplibre-gl";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

export const handleMapClick = async (event: MapLayerMouseEvent) => {
  const point = event.lngLat;
  const map = event.target;

  const lngLatToMeters = (lng: number, lat: number) => {
    const x = (lng * 20037508.34) / 180;
    let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
    y = (y * 20037508.34) / 180;
    return { x, y };
  };

  const { x, y } = lngLatToMeters(point.lng, point.lat);
  const size = 10;
  const xmin = x - size / 2;
  const xmax = x + size / 2;
  const ymin = y - size / 2;
  const ymax = y + size / 2;
  const geometry = encodeURIComponent(
    JSON.stringify({
      spatialReference: { latestWkid: 3857, wkid: 102100 },
      xmin,
      ymin,
      xmax,
      ymax,
    }),
  );

  const url = `https://cartagene.cerema.fr/server/rest/services/l_lcz_spot_000_2022_mil/MapServer/0/query?f=json&geometry=${geometry}&maxAllowableOffset=4.777314267945864&outFields=are,bsr,bur,hre,identifier,lcz,ror,ver,vhr,war,FID&spatialRel=esriSpatialRelIntersects&where=1%3D1&geometryType=esriGeometryEnvelope&inSR=102100&outSR=102100`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const props = data.features[0].attributes;
      const labels: Record<string, string> = {
        are: "Surface moyenne des bâtiments (m²)",
        FID: "FID",
        lcz: "LCZ",
        bur: "Taux de surface bâtie (%)",
        hre: "Hauteur moyenne des bâtiments (m)",
        ror: "Taux de surface imperméable (%)",
        ver: "Taux de végétation (%)",
        vhr: "Part de végétation arborée (%)",
        bsr: "Taux de sol nu perméable (%)",
        war: "Taux de surface en eau (%)",
      };
      const lcz = props.lcz || "";
      let content = `
              <h5 style='font-size:18px; margin:0;'>
                <b>LCZ ${lcz}</b>
              </h5>
            `;
      const order = ["are", "bur", "hre", "ror", "ver", "vhr", "bsr", "war"];
      for (const key of order) {
        if (props[key] !== undefined) {
          content += `<b>${labels[key]}</b> : ${props[key]}<br/>`;
        }
      }
      new maplibregl.Popup({
        className: "custom-maplibre-popup",
      })
        .setLngLat([point.lng, point.lat])
        .setHTML(content)
        .addTo(map);
    } else {
      new maplibregl.Popup().setLngLat([point.lng, point.lat]).setHTML("Aucune donnée LCZ pour cette zone.").addTo(map);
    }
  } catch (e) {
    customCaptureException(`Erreur lors de la récupération des données LCZ, [${point.lng},${point.lat}]`, e);
    new maplibregl.Popup()
      .setLngLat([point.lng, point.lat])
      .setHTML("Erreur lors de la récupération des données LCZ.")
      .addTo(map);
  }
};

export const addLCZLayers = (map: maplibregl.Map) => {
  //Must use env variable in query to bypass browser cache between prod & staging
  const environment = process.env.NEXT_PUBLIC_SENTRY_ENV ?? "development";
  if (!map.getLayer("lcz-high-layer")) {
    map.addSource("lcz-high-source", {
      type: "raster",
      tiles: [
        `https://cartagene.cerema.fr/server/rest/services/Hosted/l_lcz_spot_000_2022_tl/MapServer/tile/{z}/{y}/{x}?env=${environment}`,
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.cerema.fr/fr/actualites/cerema-publie-nouvelles-donnees-surchauffe-urbaine/" target="_blank">Cerema</a>',
    });
    map.addLayer({
      id: "lcz-high-layer",
      type: "raster",
      source: "lcz-high-source",
      paint: { "raster-opacity": 0.7 },
      maxzoom: 14,
    });
  }
  if (!map.getLayer("lcz-low-layer")) {
    map.addSource("lcz-low-source", {
      type: "raster",
      tiles: [
        "https://cartagene.cerema.fr/server/services/l_lcz_spot_000_2022_mil/MapServer/WMSServer?service=WMS&request=GetMap&layers=0&styles=&format=image%2Fpng&transparent=true&version=1.3.0&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}%20Request%20Method%20GET",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.cerema.fr/fr/actualites/cerema-publie-nouvelles-donnees-surchauffe-urbaine/" target="_blank">Cerema</a>',
    });
    map.addLayer({
      id: "lcz-low-layer",
      type: "raster",
      source: "lcz-low-source",
      "source-layer": "0",
      paint: { "raster-opacity": 0.5 },
      minzoom: 14,
    });
  }
};
