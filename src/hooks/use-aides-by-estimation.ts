import { AidesTerritoiresAidesResponse } from "@/components/financement/types";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { SEARCH_AIDE_FOR_ESTIMATION_URL } from "@/helpers/routes";

export const useAidesByEstimationFetcher = (estimationId: string) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAidesResponse>(
    SEARCH_AIDE_FOR_ESTIMATION_URL(+estimationId),
  );
  return { data, isLoading };
};
