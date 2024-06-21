import { generateRandomId } from "@/helpers/common";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { estimation, Prisma } from "@prisma/client";
import { EstimationMateriauxFicheSolution, EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";

export const getEstimationById = async (estimationId: number): Promise<estimation | null> => {
  return prismaClient.estimation.findUnique({
    where: {
      id: estimationId,
      deleted_at: null,
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
  return prismaClient.estimation.create({
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
    },
  });
};

export const updateEstimationMateriaux = async (
  estimationId: number,
  estimationMateriaux: EstimationMateriauxFicheSolution[],
): Promise<EstimationWithAides> => {
  return prismaClient.estimation.update({
    where: {
      id: estimationId,
      deleted_at: null,
    },
    data: {
      materiaux: estimationMateriaux as Prisma.JsonArray,
      updated_at: new Date(),
    },
    include: {
      estimations_aides: {
        include: { aide: true },
      },
    },
  });
};
