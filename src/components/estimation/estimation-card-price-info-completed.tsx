"use client";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import { computePriceEstimationFicheSolution } from "@/src/helpers/estimation";
import { useMemo } from "react";

export const EstimationCardPriceInfoCompleted = ({ estimationInfo }: { estimationInfo: EstimationFicheSolution }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(
    makeFicheSolutionCompleteUrlApi(estimationInfo.fiche_solution_id),
  );

  const ficheSolution = data && data[0];

  const globalPrice = useMemo(
    () => ficheSolution && computePriceEstimationFicheSolution(ficheSolution, estimationInfo.estimation_materiaux),
    [ficheSolution, estimationInfo.estimation_materiaux],
  );

  return (
    <div className="text-sm">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="mb-3 h-4 w-3/4 rounded-md bg-dsfr-contrast-grey"></div>
          <div className="h-4 w-3/4 rounded-md bg-dsfr-contrast-grey"></div>
        </div>
      ) : (
        <>
          <div>
            <strong>{`${formatNumberWithSpaces(globalPrice?.fourniture.min)} - ${formatNumberWithSpaces(
              globalPrice?.fourniture.max,
            )} € `}</strong>
            HT
          </div>
          <div className="text-dsfr-text-mention-grey">
            {`${formatNumberWithSpaces(globalPrice?.entretien.min)} - ${formatNumberWithSpaces(
              globalPrice?.entretien.max,
            )} € HT / an`}
          </div>
        </>
      )}
    </div>
  );
};
