"use client";
import { Climadiag } from "@/src/components/climadiag/types";
import { addOverlay, mapStyles, Overlay } from "carte-facile";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";

type SurchauffeUrbaineLCZMapProps = {
  climadiagInfo: Climadiag;
};

export const SurchauffeUrbaineLCZMapMapLibre = ({ climadiagInfo }: SurchauffeUrbaineLCZMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const adresseInfo = climadiagInfo.adresse_all_infos as unknown as GeoJsonAdresse | undefined;
    const coordinates = adresseInfo?.geometry.coordinates;
    const center: [number, number] =
      coordinates && coordinates[0] && coordinates[1] ? [coordinates[0], coordinates[1]] : [2.333333, 48.86471];
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyles.desaturated,
      attributionControl: false,
      center,
      zoom: 11,
    });
    addOverlay(map, Overlay.administrativeBoundaries);
    map.on("load", () => {
      map.addSource("lcz-high-source", {
        type: "raster",
        tiles: [
          "https://cartagene.cerema.fr/server/rest/services/Hosted/l_lcz_spot_000_2022_tl/MapServer/tile/{z}/{y}/{x}",
        ],
      });
      map.addLayer({
        id: "lcz-high-layer",
        type: "raster",
        source: "lcz-high-source",
        paint: { "raster-opacity": 0.7 },
        maxzoom: 14,
      });
      map.addSource("lcz-low-source", {
        type: "raster",
        tiles: [
          "https://cartagene.cerema.fr/server/services/l_lcz_spot_000_2022_mil/MapServer/WMSServer?service=WMS&request=GetMap&layers=0&styles=&format=image%2Fpng&transparent=true&version=1.3.0&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}%20Request%20Method%20GET",
        ],
        tileSize: 256,
      });
      map.addLayer({
        id: "lcz-low-layer",
        type: "raster",
        source: "lcz-low-source",
        "source-layer": "0",
        paint: { "raster-opacity": 0.5 },
        minzoom: 14,
      });
    });
    return () => map.remove();
  }, [climadiagInfo]);

  return <div ref={mapContainer} className="h-full w-full"></div>;
};

export default SurchauffeUrbaineLCZMapMapLibre;
