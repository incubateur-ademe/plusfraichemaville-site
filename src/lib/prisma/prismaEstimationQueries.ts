import { generateRandomId } from "@/src/helpers/common";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { estimation, Prisma } from "@/src/generated/prisma/client";
import { EstimationMateriauxFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
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
  estimationMateriaux: EstimationMateriauxFicheSolution[],
): Promise<EstimationWithAides> => {
  await prismaClient.$transaction(async (tx) => {
    for (const em of estimationMateriaux) {
      const estimationFicheSolution = await tx.estimation_fiche_solution.findFirst({
        where: {
          estimation_id: estimationId,
          fiche_solution_id: em.ficheSolutionId,
        },
      });

      let estimationFicheSolutionId = estimationFicheSolution?.id;

      if (estimationFicheSolution) {
        await tx.estimation_fiche_solution.update({
          where: { id: estimationFicheSolution.id },
          data: {
            cout_min_investissement: em.coutMinInvestissement,
            cout_max_investissement: em.coutMaxInvestissement,
            cout_min_entretien: em.coutMinEntretien,
            cout_max_entretien: em.coutMaxEntretien,
            quantite: em.quantite,
          },
        });
      } else {
        const created = await tx.estimation_fiche_solution.create({
          data: {
            estimation_id: estimationId,
            fiche_solution_id: em.ficheSolutionId,
            cout_min_investissement: em.coutMinInvestissement,
            cout_max_investissement: em.coutMaxInvestissement,
            cout_min_entretien: em.coutMinEntretien,
            cout_max_entretien: em.coutMaxEntretien,
            quantite: em.quantite,
          },
        });
        estimationFicheSolutionId = created.id;
      }

      if (em.estimationMateriaux) {
        // Delete existing materials for this solution
        await tx.estimation_materiaux.deleteMany({
          where: {
            estimation_fiche_solution_id: estimationFicheSolutionId,
          },
        });

        // Create new materials
        if (em.estimationMateriaux.length > 0) {
          await tx.estimation_materiaux.createMany({
            data: em.estimationMateriaux.map((m) => ({
              estimation_fiche_solution_id: estimationFicheSolutionId!,
              materiau_id: +m.materiauId,
              quantite: m.quantite,
              cout_investissement_override: m.coutInvestissementOverride ?? null,
              cout_entretien_override: m.coutEntretienOverride ?? null,
            })),
          });
        }
      }
    }

    await tx.estimation.update({
      where: { id: estimationId },
      data: { updated_at: new Date() },
    });
  });

  const response = await prismaClient.estimation.findUniqueOrThrow({
    where: { id: estimationId },
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
