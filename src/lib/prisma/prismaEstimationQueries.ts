import { generateRandomId } from "@/src/helpers/common";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { EstimationFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { projetUpdated } from "./prismaProjetQueries";

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
  estimationFicheSolution: EstimationFicheSolution,
): Promise<EstimationWithAides> => {
  await prismaClient.$transaction(async (tx) => {
    const newEstimationFicheSolution = await tx.estimation_fiche_solution.upsert({
      where: {
        estimation_id_fiche_solution_id: {
          estimation_id: estimationId,
          fiche_solution_id: estimationFicheSolution.ficheSolutionId,
        },
      },
      update: {
        quantite: estimationFicheSolution.quantite,
        cout_min_entretien: estimationFicheSolution.coutMinEntretien,
        cout_max_entretien: estimationFicheSolution.coutMaxEntretien,
        cout_min_investissement: estimationFicheSolution.coutMinInvestissement,
        cout_max_investissement: estimationFicheSolution.coutMaxInvestissement,
        estimation_materiaux: { deleteMany: {} },
      },
      create: {
        estimation_id: estimationId,
        fiche_solution_id: estimationFicheSolution.ficheSolutionId,
        quantite: estimationFicheSolution.quantite,
        cout_min_entretien: estimationFicheSolution.coutMinEntretien,
        cout_max_entretien: estimationFicheSolution.coutMaxEntretien,
        cout_min_investissement: estimationFicheSolution.coutMinInvestissement,
        cout_max_investissement: estimationFicheSolution.coutMaxInvestissement,
      },
    });
    for (const m of estimationFicheSolution.estimationMateriaux ?? []) {
      await tx.estimation_materiaux.create({
        data: {
          estimation_fiche_solution_id: newEstimationFicheSolution.id,
          quantite: m.quantite,
          cout_investissement_override: m.coutInvestissementOverride,
          cout_entretien_override: m.coutEntretienOverride,
          materiau_id: +m.materiauId,
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
