"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { LatLngTuple } from "leaflet";

export const useCurrentProjetCoordinates = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  if (!projet) {
    return null;
  }
  const collectivite = projet?.collectivite;

  const coordinates = { latitude: collectivite?.latitude, longitude: collectivite?.longitude };

  return [coordinates.latitude, coordinates.longitude] as LatLngTuple;
};
