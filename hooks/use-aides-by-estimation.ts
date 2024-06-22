import { SEARCH_AIDE_FOR_ESTIMATION_URL } from "@/app/api/search-aides-for-estimation/route";
import { AidesTerritoiresAidesResponse } from "@/components/financement/types";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";

export const useAidesByEstimationFetcher = (estimationId: string) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAidesResponse>(
    SEARCH_AIDE_FOR_ESTIMATION_URL(+estimationId),
  );
  return { data, isLoading };
};
