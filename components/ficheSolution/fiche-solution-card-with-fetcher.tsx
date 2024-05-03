"use client";

import { useSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import FicheSolutionCardWithUserInfo, { FicheSolutionCardWithUserInfoProps } from "./FicheSolutionCardWithUserInfo";
import { makeFicheSolutionCompleteUrlApi, makeFicheSolutionUrlApi } from "./helpers";
import { FicheSolutionResponse } from "./type";
import { FicheSolutionFullCardSkeleton } from "./fiche-solution-full-card-skeleton";

interface FicheSolutionCardWithFetcherProps extends Omit<FicheSolutionCardWithUserInfoProps, "ficheSolution"> {
  complete: boolean;
  id: string | number;
}

export const FicheSolutionCardWithFetcher = ({ complete, id, ...props }: FicheSolutionCardWithFetcherProps) => {
  const urlMaker = complete ? makeFicheSolutionCompleteUrlApi : makeFicheSolutionUrlApi;
  const { data, isLoading } = useSwrWithFetcher<FicheSolutionResponse[]>(urlMaker(id));

  return !data && isLoading ? (
    <FicheSolutionFullCardSkeleton />
  ) : (
    data && <FicheSolutionCardWithUserInfo ficheSolution={data[0]} {...props} />
  );
};
