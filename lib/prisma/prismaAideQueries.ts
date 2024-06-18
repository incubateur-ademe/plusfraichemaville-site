import { prismaClient } from "@/lib/prisma/prismaClient";

export const getAidesByEstimationId = async (estimationId: number) => {
  return prismaClient.estimations_aides.findMany({
    where: {
      estimationId,
    },
    include: {
      aide: true,
    },
  });
};
