"use client";

import { GeoJsonAdresse } from "@/src/components/annuaire/types";
import { useMap } from "react-map-gl/maplibre";
import { useEffect } from "react";
import { ClimadiagDto } from "@/src/types/dto";

export const LCZMapFocus = ({ climadiagInfo }: { climadiagInfo: ClimadiagDto }) => {
  const { current: map } = useMap();

  useEffect(() => {
    const adresseInfo = climadiagInfo.adresseAllInfos as unknown as GeoJsonAdresse | undefined;
    const coordinates = adresseInfo?.geometry.coordinates;
    const center: [number, number] =
      coordinates && coordinates[0] && coordinates[1] ? [coordinates[0], coordinates[1]] : [2.333333, 48.86471];
    setTimeout(() => map?.flyTo({ center, zoom: 11 }), 500);
  }, [climadiagInfo, map]);
  return null;
};
