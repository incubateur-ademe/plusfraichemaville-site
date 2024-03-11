import { generateRandomId } from "@/helpers/common";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { estimation } from "@prisma/client";

export const getEstimationById = async (estimationId: number): Promise<estimation | null> => {
  return prismaClient.estimation.findUnique({
    where: {
      id: estimationId,
    },
  });
};

export const deleteEstimation = (estimationId: number) => {
  return prismaClient.estimation.delete({
    where: {
      id: estimationId,
    },
  });
};

export const createEstimation = async (
  projetId: number,
  fichesSolutionId: number[],
  createdBy: string,
): Promise<estimation> => {
  return prismaClient.estimation.create({
    data: {
      projet_id: projetId,
      fiches_solutions_id: fichesSolutionId,
      created_by: createdBy,
      status: "en_cours",
      id: generateRandomId(),
    },
  });
};
