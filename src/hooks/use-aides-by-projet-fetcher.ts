import { AidesTerritoiresAidesResponse } from "@/src/components/financement/types";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { SEARCH_AIDE_FOR_PROJET_URL } from "@/src/helpers/routes";
import { useUserStore } from "@/src/stores/user/provider";

export const useAidesByProjetFetcher = (projetId: number | undefined, ficheSolutionIds?: number[]) => {
  const userId = useUserStore((state) => state.userInfos?.id);
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAidesResponse>(
    projetId ? SEARCH_AIDE_FOR_PROJET_URL(projetId, ficheSolutionIds, userId) : "",
  );
  return { data, isLoading };
};
