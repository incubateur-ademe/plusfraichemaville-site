import { EstimationAide } from "@/src/lib/prisma/prismaCustomTypes";
import { ProjetsState } from "./store";

export const updateAideInEstimation = (
  state: ProjetsState,
  estimationId: number,
  estimationAide: EstimationAide | null,
  aideTerritoireId: number | null,
) => {
  return {
    projets: state.projets.map((projet) => ({
      ...projet,
      estimations: projet.estimations.map((estimation) =>
        estimation.id === estimationId
          ? {
              ...estimation,
              estimations_aides: estimationAide
                ? [
                    ...estimation.estimations_aides.filter((ea) => ea.aide.id !== estimationAide.aide.id),
                    estimationAide,
                  ]
                : estimation.estimations_aides.filter((ea) => ea.aide.aideTerritoireId !== aideTerritoireId),
            }
          : estimation,
      ),
    })),
  };
};
