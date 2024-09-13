import { AidesTerritoiresAidesResponse } from "@/components/financement/types";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";

export const useAidesSelectedByEstimationFetcher = (estimationId: number) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAidesResponse>(
    `/api/search-aides-for-estimation?estimationId=${estimationId}`,
  );
  return { data, isLoading };
};
