import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { EstimationAide } from "@/src/lib/prisma/prismaCustomTypes";
import { projetUpdated } from "./prismaProjetQueries";

export const addAideInEstimation = async (
  estimationId: number,
  aideId: number,
  userId: string,
): Promise<EstimationAide> => {
  const response = await prismaClient.estimations_aides.upsert({
    where: {
      estimationId_aideId: {
        estimationId,
        aideId,
      },
    },
    update: {},
    create: {
      estimationId,
      aideId,
      user_id: userId,
    },
    include: {
      aide: true,
    },
  });

  const estimation = await prismaClient.estimation.findUnique({
    where: { id: estimationId },
    select: { projet_id: true },
  });

  if (estimation) {
    await projetUpdated(estimation.projet_id);
  }

  return response;
};

export const deleteAideInEstimation = async (estimationId: number, aideId: number): Promise<EstimationAide | null> => {
  const response = await prismaClient.estimations_aides.delete({
    where: {
      estimationId_aideId: {
        estimationId,
        aideId,
      },
    },
    include: {
      aide: true,
    },
  });

  const estimation = await prismaClient.estimation.findUnique({
    where: { id: estimationId },
    select: { projet_id: true },
  });

  if (estimation) {
    await projetUpdated(estimation.projet_id);
  }

  return response;
};
