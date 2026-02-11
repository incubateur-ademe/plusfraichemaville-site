import { generateRandomId } from "@/src/helpers/common";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { EstimationFicheSolution, EstimationMateriau } from "@/src/lib/prisma/prismaCustomTypes";
import { projetUpdated } from "./prismaProjetQueries";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { EstimationWithAidesDto } from "@/src/types/dto";
import { convertEstimationWithAidesToDto } from "./dto-converters";

const estimationIncludes = {
  estimations_aides: {
    include: { aide: true },
  },
  estimations_fiches_solutions: {
    include: {
      estimation_materiaux: true,
    },
  },
};

export const getEstimationById = async (estimationId: number): Promise<EstimationWithAidesDto | null> => {
  const estimation = await prismaClient.estimation.findUnique({
    where: {
      id: estimationId,
      deleted_at: null,
    },
    include: estimationIncludes,
  });
  return estimation ? convertEstimationWithAidesToDto(estimation) : null;
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
  fichesSolutions: FicheSolution[],
  createdBy: string,
): Promise<EstimationWithAidesDto> => {
  const newEstimation = await prismaClient.$transaction(async (tx) => {
    const createdEstimation = await tx.estimation.create({
      data: {
        projet_id: projetId,
        created_by: createdBy,
        id: generateRandomId(),
      },
      include: estimationIncludes,
    });
    for (const ficheSolution of fichesSolutions) {
      const newEstimationFicheSolution = await tx.estimation_fiche_solution.create({
        data: {
          estimation_id: createdEstimation.id,
          fiche_solution_id: +ficheSolution.id,
          cout_max_entretien: 0,
          cout_min_entretien: 0,
          cout_max_investissement: 0,
          cout_min_investissement: 0,
          estimation_materiaux: {
            createMany: {
              data:
                ficheSolution.attributes.materiaux?.data.map((materiau) => ({
                  materiau_id: +materiau.id,
                  quantite: 0,
                })) || [],
            },
          },
        },
        include: { estimation_materiaux: true },
      });
      createdEstimation.estimations_fiches_solutions.push(newEstimationFicheSolution);
    }
    return createdEstimation;
  });

  await projetUpdated(newEstimation.projet_id);

  return convertEstimationWithAidesToDto(newEstimation);
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
    | "cout_investissement_override"
    | "cout_entretien_override"
  > & {
    estimation_materiaux: Array<EstimationMateriau>;
  },
): Promise<EstimationWithAidesDto> => {
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
        cout_investissement_override: estimationFicheSolution.cout_investissement_override,
        cout_entretien_override: estimationFicheSolution.cout_entretien_override,
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
        cout_investissement_override: estimationFicheSolution.cout_investissement_override,
        cout_entretien_override: estimationFicheSolution.cout_entretien_override,
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
    include: estimationIncludes,
  });

  await projetUpdated(newEstimation.projet_id);

  return convertEstimationWithAidesToDto(newEstimation);
};

export const deleteFicheSolutionInEstimation = async (
  estimationId: number,
  ficheSolutionId: number,
): Promise<EstimationWithAidesDto> => {
  return prismaClient.$transaction(async (tx) => {
    const estimation = await tx.estimation.findUnique({
      where: { id: estimationId, deleted_at: null },
      select: { projet_id: true },
    });

    if (!estimation) {
      throw new Error("Estimation introuvable");
    }

    await tx.estimation_fiche_solution.delete({
      where: {
        estimation_id_fiche_solution_id: {
          estimation_id: estimationId,
          fiche_solution_id: ficheSolutionId,
        },
      },
    });

    const updatedEstimation = await tx.estimation.update({
      where: { id: estimationId },
      data: {
        updated_at: new Date(),
      },
      include: estimationIncludes,
    });

    await projetUpdated(estimation.projet_id);

    return convertEstimationWithAidesToDto(updatedEstimation);
  });
};

export const addFichesSolutionsToEstimation = async (
  estimationId: number,
  fichesSolutions: FicheSolution[],
): Promise<EstimationWithAidesDto> => {
  const estimation = await getEstimationById(estimationId);
  if (!estimation) {
    throw new Error("Estimation introuvable");
  }

  const updatedEstimation = await prismaClient.$transaction(async (tx) => {
    for (const ficheSolution of fichesSolutions) {
      await tx.estimation_fiche_solution.create({
        data: {
          estimation_id: estimationId,
          fiche_solution_id: +ficheSolution.id,
          cout_max_entretien: 0,
          cout_min_entretien: 0,
          cout_max_investissement: 0,
          cout_min_investissement: 0,
          estimation_materiaux: {
            createMany: {
              data:
                ficheSolution.attributes.materiaux?.data.map((materiau) => ({
                  materiau_id: +materiau.id,
                  quantite: 0,
                })) || [],
            },
          },
        },
        include: { estimation_materiaux: true },
      });
    }

    const updatedEstimationData = await tx.estimation.update({
      where: { id: estimationId },
      data: {
        updated_at: new Date(),
      },
      include: estimationIncludes,
    });

    await projetUpdated(estimation.projetId);

    return updatedEstimationData;
  });

  return convertEstimationWithAidesToDto(updatedEstimation);
};
