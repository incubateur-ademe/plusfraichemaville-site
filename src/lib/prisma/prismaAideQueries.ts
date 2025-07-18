import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { aide } from "@/src/generated/prisma/client";

export const getAideById = async (aideId: number) => {
  return prismaClient.aide.findUnique({
    where: {
      id: aideId,
    },
  });
};

export const upsertAide = async (aideData: Omit<aide, "id">) => {
  return prismaClient.aide.upsert({
    where: {
      aideTerritoireId: aideData.aideTerritoireId,
    },
    update: aideData,
    create: aideData,
  });
};
