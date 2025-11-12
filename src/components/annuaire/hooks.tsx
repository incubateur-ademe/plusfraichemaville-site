"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { ComponentType } from "react";
import { getProjetCoordinates } from "@/src/components/annuaire/helpers";

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
  onClick?: () => void;
  Content: ComponentType<{
    data: T;
    onClick?: () => void;
  }>;
}

export function useSidePanelFetcher<T>({ url, Skeleton, Content, onClick }: UseSidePanelFetcherConfig<T>) {
  const { data, isLoading } = useImmutableSwrWithFetcher<T>(url);

  if (isLoading) {
    return <Skeleton />;
  }

  return data ? <Content data={data} onClick={onClick} /> : <div>Erreur de chargement des informations.</div>;
}
