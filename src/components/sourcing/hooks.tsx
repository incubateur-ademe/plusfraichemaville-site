"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { LatLngTuple } from "leaflet";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { ComponentType } from "react";

export const useCurrentProjetCoordinates = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  if (!projet) {
    return null;
  }
  const collectivite = projet?.collectivite;

  const coordinates = { latitude: collectivite?.latitude, longitude: collectivite?.longitude };

  return [coordinates.latitude, coordinates.longitude] as LatLngTuple;
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
