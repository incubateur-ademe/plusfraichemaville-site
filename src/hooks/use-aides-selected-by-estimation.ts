import { AidesTerritoiresAidesResponse } from "@/src/components/financement/types";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { SEARCH_AIDE_FOR_ESTIMATION_URL } from "@/src/helpers/routes";

export const useAidesByEstimationFetcher = (estimationId: number) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAidesResponse>(
    SEARCH_AIDE_FOR_ESTIMATION_URL(estimationId),
  );
  return { data, isLoading };
};
