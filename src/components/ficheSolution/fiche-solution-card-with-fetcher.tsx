"use client";

import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import FicheSolutionCard, { FicheSolutionCardProps } from "./fiche-solution-card";
import { makeFicheSolutionCompleteUrlApi, makeFicheSolutionUrlApi } from "./helpers";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

interface FicheSolutionCardWithFetcherProps extends Omit<FicheSolutionCardProps, "ficheSolution"> {
  complete: boolean;
  id: string | number;
}

export const FicheSolutionCardWithFetcher = ({ complete, id, ...props }: FicheSolutionCardWithFetcherProps) => {
  const urlMaker = complete ? makeFicheSolutionCompleteUrlApi : makeFicheSolutionUrlApi;
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(urlMaker(id));

  return !data && isLoading ? (
    <FicheCardSkeleton />
  ) : (
    data && data[0] && <FicheSolutionCard ficheSolution={data[0]} {...props} titleHeadingLevel="h2" />
  );
};
