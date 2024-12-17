"use client";

import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import FicheSolutionCardWithUserInfo, { FicheSolutionCardWithUserInfoProps } from "./FicheSolutionCardWithUserInfo";
import { makeFicheSolutionCompleteUrlApi, makeFicheSolutionUrlApi } from "./helpers";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

interface FicheSolutionCardWithFetcherProps extends Omit<FicheSolutionCardWithUserInfoProps, "ficheSolution"> {
  complete: boolean;
  id: string | number;
}

export const FicheSolutionCardWithFetcher = ({ complete, id, ...props }: FicheSolutionCardWithFetcherProps) => {
  const urlMaker = complete ? makeFicheSolutionCompleteUrlApi : makeFicheSolutionUrlApi;
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(urlMaker(id));

  return !data && isLoading ? (
    <FicheCardSkeleton />
  ) : (
    data && data[0] && <FicheSolutionCardWithUserInfo ficheSolution={data[0]} {...props} />
  );
};
