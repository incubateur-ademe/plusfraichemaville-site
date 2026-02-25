import { AidesTerritoiresAidesResponse } from "@/src/components/financement/types";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { SEARCH_AIDE_FOR_PROJET_URL } from "@/src/helpers/routes";

export const useAidesByProjetFetcher = (projetId: number | undefined, ficheSolutionIds?: number[]) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAidesResponse>(
    projetId ? SEARCH_AIDE_FOR_PROJET_URL(projetId, ficheSolutionIds) : "",
  );
  return { data, isLoading };
};
