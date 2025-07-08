"use client";

import "leaflet/dist/leaflet.css";
import { Climadiag } from "@/src/components/climadiag/types";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";
import { useMap } from "react-map-gl/maplibre";
import { useEffect } from "react";

export const LCZMapMlFocus = ({ climadiagInfo }: { climadiagInfo: Climadiag }) => {
  const { current: map } = useMap();

  useEffect(() => {
    const adresseInfo = climadiagInfo.adresse_all_infos as unknown as GeoJsonAdresse | undefined;
    const coordinates = adresseInfo?.geometry.coordinates;
    const center: [number, number] =
      coordinates && coordinates[0] && coordinates[1] ? [coordinates[0], coordinates[1]] : [2.333333, 48.86471];
    setTimeout(() => map?.flyTo({ center, zoom: 11 }), 500);
  }, [climadiagInfo, map]);
  return null;
};
