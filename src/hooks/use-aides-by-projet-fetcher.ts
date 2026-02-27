import { AidesTerritoiresAidesResponse } from "@/src/components/financement/types";
import { SEARCH_AIDE_FOR_PROJET_URL } from "@/src/helpers/routes";
import { useUserStore } from "@/src/stores/user/provider";
import { useSwrWithFetcher } from "./use-swr-with-fetcher";

export const useAidesByProjetFetcher = (
  projetId: number | undefined,
  ficheSolutionIds?: number[],
  updateProjetFsUnselected?: boolean,
) => {
  const userId = useUserStore((state) => state.userInfos?.id);
  const { data, isLoading } = useSwrWithFetcher<AidesTerritoiresAidesResponse>(
    projetId ? SEARCH_AIDE_FOR_PROJET_URL(projetId, ficheSolutionIds, userId, updateProjetFsUnselected) : "",
  );
  return { data, isLoading };
};
