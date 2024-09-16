import { AidesTerritoiresAidesResponse } from "@/src/components/financement/types";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";

export const useAidesSelectedByEstimationFetcher = (estimationId: number) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAidesResponse>(
    `/api/search-aides-for-estimation?estimationId=${estimationId}`,
  );
  return { data, isLoading };
};
