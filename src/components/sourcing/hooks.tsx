"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { ComponentType } from "react";
import { getProjetCoordinates } from "@/src/components/sourcing/helpers";

export const useCurrentProjetCoordinates = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  if (!projet) {
    return null;
  }
  return getProjetCoordinates(projet);
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
