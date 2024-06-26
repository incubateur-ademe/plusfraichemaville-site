import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { AideCard } from "./aide-card";
import { AidesTerritoiresAide } from "../types";
import { AideCardSkeleton } from "./aide-card-skeleton";
import { GET_AIDES_TERRITOIRES_BY_AIDE_ID_URL } from "@/app/api/get-aides-territoires-aide-by-aide-id/route";

type AideCardWithFetcherProps = {
  aideId: number;
};
export const AideCardWithFetcher = ({ aideId }: AideCardWithFetcherProps) => {
  // TODO : create route for fetch a simple aide
  const { data, isLoading } = useImmutableSwrWithFetcher<AidesTerritoiresAide>(
    GET_AIDES_TERRITOIRES_BY_AIDE_ID_URL(aideId),
  );
  if (!data) {
    return null;
  }
  return isLoading ? <AideCardSkeleton /> : <AideCard aide={data} />;
};
