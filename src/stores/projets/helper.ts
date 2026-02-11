import { EstimationAideDto } from "@/src/types/dto";
import { ProjetsState } from "./store";

export const updateAideInEstimation = (
  state: ProjetsState,
  estimationId: number,
  estimationAide: EstimationAideDto | null,
  aideTerritoireId: number | null,
) => {
  return {
    projets: state.projets.map((projet) => ({
      ...projet,
      estimations: projet.estimations.map((estimation) =>
        estimation.id === estimationId
          ? {
              ...estimation,
              estimationsAides: estimationAide
                ? [
                    ...estimation.estimationsAides.filter((ea) => ea.aide.id !== estimationAide.aide.id),
                    estimationAide,
                  ]
                : estimation.estimationsAides.filter((ea) => ea.aide.aideTerritoireId !== aideTerritoireId),
            }
          : estimation,
      ),
    })),
  };
};
