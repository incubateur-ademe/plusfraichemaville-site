import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { AideCard } from "./aide-card";
import { AidesTerritoiresAide } from "../types";
import { AideCardSkeleton } from "./aide-card-skeleton";

type AideCardWithFetcherProps = {
  aideId: number;
};
export const AideCardWithFetcher = ({ aideId }: AideCardWithFetcherProps) => {
  // TODO : create route for fetch a simple aide
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAide>(`${aideId}`);
  if (!data) {
    return null;
  }
  return isLoading ? <AideCardSkeleton /> : <AideCard aide={data} />;
};
