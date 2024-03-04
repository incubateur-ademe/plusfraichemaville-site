import { prismaClient } from "@/lib/prisma/prismaClient";
import { estimation } from "@prisma/client";

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
      status: "en_cours"
    },
  });
};
