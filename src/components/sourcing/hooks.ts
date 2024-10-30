"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { LatLngTuple } from "leaflet";
import { GeoJsonAdresse } from "./types";
import { lambert93toWGPS } from "@/src/helpers/convert-coordinates";

export const useCurrentProjetCoordinates = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  if (!projet) {
    return null;
  }
  const adresseInfo = projet?.adresse_info as unknown as GeoJsonAdresse["properties"];
  const collectivite = projet?.collectivite;

  const coordinates = adresseInfo
    ? lambert93toWGPS(adresseInfo.x, adresseInfo.y)
    : { latitude: collectivite?.latitude, longitude: collectivite?.longitude };

  return [coordinates.latitude, coordinates.longitude] as LatLngTuple;
};
