import { AidesTerritoiresAidesByEstimation } from "@/components/financement/types";
import { prismaClient } from "@/lib/prisma/prismaClient";

export const getAidesByEstimationId = async (estimationIds: number[]): Promise<AidesTerritoiresAidesByEstimation> => {
  const results = await prismaClient.estimations_aides.findMany({
    where: {
      estimationId: {
        in: estimationIds,
      },
    },
    include: {
      aide: true,
    },
  });

  const groupedByEstimationId: AidesTerritoiresAidesByEstimation = results.reduce((acc, curr) => {
    if (!acc[curr.estimationId]) {
      acc[curr.estimationId] = [];
    }
    acc[curr.estimationId].push(curr.aide);
    return acc;
  }, {} as AidesTerritoiresAidesByEstimation);

  return groupedByEstimationId;
};
