import { prismaClient } from "@/lib/prisma/prismaClient";

export const getAideById = async (aideId: number) => {
  return prismaClient.aide.findUnique({
    where: {
      id: aideId,
    },
  });
};
