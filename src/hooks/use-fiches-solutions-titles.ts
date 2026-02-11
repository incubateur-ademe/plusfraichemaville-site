import { useMemo } from "react";
import { EstimationFicheSolutionDto } from "@/src/types/dto";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";

export function useFichesSolutionsTitles(estimationsFichesSolutions?: EstimationFicheSolutionDto[]) {
  const allFicheSolutionIds = useMemo(
    () => estimationsFichesSolutions?.map((efs) => +efs.ficheSolutionId) || [],
    [estimationsFichesSolutions],
  );

  const { data: allFichesSolutions, isLoading: isFichesSolutionsTitlesLoading } = useImmutableSwrWithFetcher<
    FicheSolution[]
  >(allFicheSolutionIds.length > 0 ? makeFicheSolutionCompleteUrlApi(allFicheSolutionIds) : null);

  const solutionTitles = useMemo(
    () =>
      allFichesSolutions?.reduce((acc, fs) => ({ ...acc, [fs.id]: fs.attributes.titre }), {} as Record<number, string>),
    [allFichesSolutions],
  );

  return { solutionTitles, isFichesSolutionsTitlesLoading, allFichesSolutions };
}
