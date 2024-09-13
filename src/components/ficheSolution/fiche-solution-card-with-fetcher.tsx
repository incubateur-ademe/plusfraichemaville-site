"use client";

import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import FicheSolutionCardWithUserInfo, { FicheSolutionCardWithUserInfoProps } from "./FicheSolutionCardWithUserInfo";
import { makeFicheSolutionCompleteUrlApi, makeFicheSolutionUrlApi } from "./helpers";
import { FicheSolutionResponse } from "./type";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";

interface FicheSolutionCardWithFetcherProps extends Omit<FicheSolutionCardWithUserInfoProps, "ficheSolution"> {
  complete: boolean;
  id: string | number;
}

export const FicheSolutionCardWithFetcher = ({ complete, id, ...props }: FicheSolutionCardWithFetcherProps) => {
  const urlMaker = complete ? makeFicheSolutionCompleteUrlApi : makeFicheSolutionUrlApi;
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(urlMaker(id));

  return !data && isLoading ? (
    <FicheCardSkeleton />
  ) : (
    data && <FicheSolutionCardWithUserInfo ficheSolution={data[0]} {...props} />
  );
};
