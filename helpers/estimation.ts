import { estimation } from "@prisma/client";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import sortBy from "lodash/sortBy";

export const isComplete = (estimation: estimation) => {
  const materiaux = estimation.materiaux as EstimationMateriauxFicheSolution[] | null;
  if (!materiaux) {
    return false;
  }
  const notEstimatedSolutionIndex = estimation.fiches_solutions_id.findIndex(
    (fsId) => !isFicheSolutionEstimated(fsId, materiaux),
  );
  return notEstimatedSolutionIndex === -1;
};

export const getLastCompletedEstimation = (estimations: estimation[]) => {
  const sortedEstimations = sortBy(estimations, "updatedAt");
  return sortedEstimations.find(isComplete);
};

const isFicheSolutionEstimated = (ficheSolutionId: number, estimationMateriaux: EstimationMateriauxFicheSolution[]) =>
  estimationMateriaux?.findIndex((estimationMat) => estimationMat.ficheSolutionId === ficheSolutionId) !== -1;

