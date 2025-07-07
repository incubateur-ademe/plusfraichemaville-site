"use client";

import type { MapRef } from "react-map-gl/maplibre";

export const addLCZLayers = (mapRef: MapRef) => {
  const map = mapRef.getMap();
  if (!map.getLayer("lcz-high-layer")) {
    map.addSource("lcz-high-source", {
      type: "raster",
      tiles: [
        "https://cartagene.cerema.fr/server/rest/services/Hosted/l_lcz_spot_000_2022_tl/MapServer/tile/{z}/{y}/{x}",
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
