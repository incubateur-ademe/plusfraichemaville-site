"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Climadiag } from "@/src/components/climadiag/types";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";

export const LCZMapFocus = ({ climadiagInfo }: { climadiagInfo: Climadiag }) => {
  const map = useMap();
  useEffect(() => {
    const adresseInfo = climadiagInfo.adresse_all_infos as unknown as GeoJsonAdresse | undefined;
    const coordinates = adresseInfo?.geometry.coordinates;
    const center =
      coordinates && coordinates[0] && coordinates[1] ? [coordinates[1], coordinates[0]] : [48.86471, 2.333333];
    const zoom = (function () {
      if (climadiagInfo.superficie > 10000) {
        return 10;
      } else {
        return 11;
      }
    })();

    map.setView({ lat: center[0], lng: center[1] }, zoom);
  }, [climadiagInfo, map]);

  return null;
};
