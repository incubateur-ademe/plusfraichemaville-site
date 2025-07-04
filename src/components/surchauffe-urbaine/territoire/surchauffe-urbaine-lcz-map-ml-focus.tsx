"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { Climadiag } from "@/src/components/climadiag/types";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";
import { useMap } from "react-map-gl/maplibre";

export const LCZMapMlFocus = ({ climadiagInfo }: { climadiagInfo: Climadiag }) => {
  const { current: map } = useMap();

  useEffect(() => {
    const adresseInfo = climadiagInfo.adresse_all_infos as unknown as GeoJsonAdresse | undefined;
    const coordinates = adresseInfo?.geometry.coordinates;
    const center =
      coordinates && coordinates[0] && coordinates[1] ? [coordinates[1], coordinates[0]] : [48.86471, 2.333333];

    map?.setCenter([center[1], center[0]]);
    map?.setZoom(12);
  }, [climadiagInfo, map]);

  return null;
};
