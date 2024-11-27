"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { LatLngTuple } from "leaflet";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { ComponentType } from "react";
import { lambert93toWGPS } from "@/src/helpers/convert-coordinates";

export const useCurrentProjetCoordinates = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  if (!projet) {
    return null;
  }

  const { collectivite, adresse_info } = projet;

  const projetCollectiviteCoordinates = [collectivite?.latitude, collectivite?.longitude];

  if (!adresse_info) {
    return projetCollectiviteCoordinates as LatLngTuple;
  }

  const { x, y } = adresse_info as { x: number; y: number };
  const { latitude, longitude } = lambert93toWGPS(x, y);

  return [latitude, longitude] as LatLngTuple;
};

interface UseSidePanelFetcherConfig<T> {
  url: string;
  Skeleton: ComponentType;
  Content: ComponentType<{ data: T }>;
}

export function useSidePanelFetcher<T>({ url, Skeleton, Content }: UseSidePanelFetcherConfig<T>) {
  const { data, isLoading } = useImmutableSwrWithFetcher<T>(url);

  if (isLoading) {
    return <Skeleton />;
  }

  return data ? <Content data={data} /> : <div>Erreur de chargement des informations.</div>;
}
