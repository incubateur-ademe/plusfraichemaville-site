import { EstimationFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { estimation } from "@/src/generated/prisma/client";
import orderBy from "lodash/orderBy";

export const isComplete = (estimation: EstimationWithAides) => {
  const materiaux: EstimationFicheSolution[] =
    estimation.estimations_fiches_solutions?.map((efs) => ({
      ficheSolutionId: efs.fiche_solution_id,
      coutMinInvestissement: efs.cout_min_investissement,
      coutMaxInvestissement: efs.cout_max_investissement,
      coutMinEntretien: efs.cout_min_entretien,
      coutMaxEntretien: efs.cout_max_entretien,
      quantite: efs.quantite ?? undefined,
      estimationMateriaux: efs.estimation_materiaux.map((em) => ({
        materiauId: em.materiau_id.toString(),
        quantite: em.quantite,
        coutInvestissementOverride: em.cout_investissement_override ?? undefined,
        coutEntretienOverride: em.cout_entretien_override ?? undefined,
      })),
    })) || [];

  if (!materiaux || materiaux.length === 0) {
    return false;
  }
  const notEstimatedSolutionIndex = estimation.fiches_solutions_id.findIndex(
    (fsId) => !isFicheSolutionEstimated(fsId, materiaux),
  );
  return notEstimatedSolutionIndex === -1;
};

export const getLastCompletedEstimation = (estimations: EstimationWithAides[] | undefined) => {
  if (!estimations || estimations.length === 0) {
    return null;
  }
  const sortedEstimations = orderBy(estimations, "updated_at", "desc");
  return sortedEstimations.find(isComplete);
};

const isFicheSolutionEstimated = (ficheSolutionId: number, estimationMateriaux: EstimationFicheSolution[]) =>
  estimationMateriaux?.findIndex((estimationMat) => estimationMat.ficheSolutionId === ficheSolutionId) !== -1;
