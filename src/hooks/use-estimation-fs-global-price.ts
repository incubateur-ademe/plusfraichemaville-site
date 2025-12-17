import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { isSimpleMateriauFicheSolution, makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import {
  computePriceEstimationFicheSolution,
  computePriceEstimationSimpleFicheSolution,
} from "@/src/helpers/estimation";

export const useEstimationFSGlobalPrice = (estimationFichesSolution: EstimationFicheSolution[]) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(
    makeFicheSolutionCompleteUrlApi(estimationFichesSolution.map((e) => e.fiche_solution_id)),
  );

  const fichesSolutionGlobalPrice = data?.reduce(
    (acc, ficheSolution) => {
      const currentEstimationFicheSolution = estimationFichesSolution.find(
        (efs) => +efs.fiche_solution_id === +ficheSolution.id,
      );
      if (currentEstimationFicheSolution) {
        const ficheSolutionPrice = isSimpleMateriauFicheSolution(ficheSolution)
          ? computePriceEstimationSimpleFicheSolution(ficheSolution, currentEstimationFicheSolution)
          : computePriceEstimationFicheSolution(ficheSolution, currentEstimationFicheSolution.estimation_materiaux);
        if (ficheSolutionPrice) {
          return {
            entretien: {
              min: ficheSolutionPrice.entretien.min + acc.entretien.min,
              max: ficheSolutionPrice.entretien.max + acc.entretien.max,
            },
            fourniture: {
              min: ficheSolutionPrice.fourniture.min + acc.fourniture.min,
              max: ficheSolutionPrice.fourniture.max + acc.fourniture.max,
            },
          };
        }
      }
      return acc;
    },
    { entretien: { min: 0, max: 0 }, fourniture: { min: 0, max: 0 } },
  );

  const fournitureMin = fichesSolutionGlobalPrice?.fourniture.min;
  const fournitureMax = fichesSolutionGlobalPrice?.fourniture.max;
  const entretienMin = fichesSolutionGlobalPrice?.entretien.min;
  const entretienMax = fichesSolutionGlobalPrice?.entretien.max;

  return { fournitureMin, fournitureMax, entretienMin, entretienMax, isLoading };
};
