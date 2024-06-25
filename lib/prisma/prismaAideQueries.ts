import { prismaClient } from "@/lib/prisma/prismaClient";
import { aide } from "@prisma/client";

export const getAideById = async (aideId: number) => {
  return prismaClient.aide.findUnique({
    where: {
      id: aideId,
    },
  });
};

export const upsertAide = async (aideData: Omit<aide, "id">) => {
  const upsertedAide = await prismaClient.aide.upsert({
    where: {
      aideTerritoireId: aideData.aideTerritoireId,
    },
    update: aideData,
    create: aideData,
  });
  return upsertedAide;
};
