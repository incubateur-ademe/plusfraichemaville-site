"use client";

import { useAddressSearch } from "@/src/hooks/use-adress-search";
import { ProjetAdresseInfo } from "@/src/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { LatLngTuple } from "leaflet";

export const useProjetCoordinates = (): LatLngTuple | undefined => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const adresseInfo = projet?.adresse_info as ProjetAdresseInfo;
  const collectivite = projet?.collectivite;
  const { addresses } = useAddressSearch(adresseInfo?.label, 1);

  if (adresseInfo && addresses?.[0]) {
    const { coordinates } = addresses[0].geometry;
    return [coordinates[1], coordinates[0]];
  }

  if (collectivite?.latitude && collectivite?.longitude) {
    return [collectivite.latitude, collectivite.longitude];
  }
};
