import { generateRandomId } from "@/src/helpers/common";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { EstimationFicheSolution, EstimationMateriau, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { projetUpdated } from "./prismaProjetQueries";
import { estimation_materiaux } from "@/src/generated/prisma/client";

export const getEstimationById = async (estimationId: number): Promise<EstimationWithAides | null> => {
  return prismaClient.estimation.findUnique({
    where: {
      id: estimationId,
      deleted_at: null,
    },
    include: {
      estimations_aides: {
        include: { aide: true },
      },
      estimations_fiches_solutions: {
        include: {
          estimation_materiaux: true,
        },
      },
    },
  });
};

export const deleteEstimation = (estimationId: number, userId: string) => {
  return prismaClient.estimation.update({
    where: {
      id: estimationId,
      deleted_at: null,
    },
    data: {
      deleted_by: userId,
      deleted_at: new Date(),
    },
  });
};

export const createEstimation = async (
  projetId: number,
  fichesSolutionId: number[],
  createdBy: string,
): Promise<EstimationWithAides> => {
  const response = await prismaClient.estimation.create({
    data: {
      projet_id: projetId,
      fiches_solutions_id: fichesSolutionId,
      created_by: createdBy,
      id: generateRandomId(),
    },
    include: {
      estimations_aides: {
        include: { aide: true },
      },
      estimations_fiches_solutions: {
        include: {
          estimation_materiaux: true,
        },
      },
    },
  });

  await projetUpdated(response.projet_id);

  return response;
};

export const updateEstimationMateriaux = async (
  estimationId: number,
  estimationFicheSolution: Pick<
    EstimationFicheSolution,
    | "fiche_solution_id"
    | "quantite"
    | "cout_min_entretien"
    | "cout_max_entretien"
    | "cout_min_investissement"
    | "cout_max_investissement"
  > & {
    estimation_materiaux: Array<EstimationMateriau>;
  },
): Promise<EstimationWithAides> => {
  await prismaClient.$transaction(async (tx) => {
    const newEstimationFicheSolution = await tx.estimation_fiche_solution.upsert({
      where: {
        estimation_id_fiche_solution_id: {
          estimation_id: estimationId,
          fiche_solution_id: estimationFicheSolution.fiche_solution_id,
        },
      },
      update: {
        quantite: estimationFicheSolution.quantite,
        cout_min_entretien: estimationFicheSolution.cout_min_entretien,
        cout_max_entretien: estimationFicheSolution.cout_max_entretien,
        cout_min_investissement: estimationFicheSolution.cout_min_investissement,
        cout_max_investissement: estimationFicheSolution.cout_max_investissement,
        estimation_materiaux: { deleteMany: {} },
      },
      create: {
        estimation_id: estimationId,
        fiche_solution_id: estimationFicheSolution.fiche_solution_id,
        quantite: estimationFicheSolution.quantite,
        cout_min_entretien: estimationFicheSolution.cout_min_entretien,
        cout_max_entretien: estimationFicheSolution.cout_max_entretien,
        cout_min_investissement: estimationFicheSolution.cout_min_investissement,
        cout_max_investissement: estimationFicheSolution.cout_max_investissement,
      },
    });
    for (const m of estimationFicheSolution.estimation_materiaux ?? []) {
      await tx.estimation_materiaux.create({
        data: {
          estimation_fiche_solution_id: newEstimationFicheSolution.id,
          quantite: m.quantite,
          cout_investissement_override: m.cout_investissement_override,
          cout_entretien_override: m.cout_entretien_override,
          materiau_id: m.materiau_id,
        },
      });
    }
  });

  const newEstimation = await prismaClient.estimation.update({
    where: { id: estimationId },
    data: { updated_at: new Date() },
    include: {
      estimations_aides: {
        include: { aide: true },
      },
      estimations_fiches_solutions: {
        include: {
          estimation_materiaux: true,
        },
      },
    },
  });

  await projetUpdated(newEstimation.projet_id);

  return newEstimation;
};
