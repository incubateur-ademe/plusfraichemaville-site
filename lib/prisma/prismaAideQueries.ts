import { AidesTerritoiresAideBaseData } from "@/components/financement/types";
import { prismaClient } from "@/lib/prisma/prismaClient";

export const getAideById = async (aideId: number) => {
  return prismaClient.aide.findUnique({
    where: {
      id: aideId,
    },
  });
};

export const upsertAide = async (aideData: AidesTerritoiresAideBaseData) => {
  const upsertedAide = await prismaClient.aide.upsert({
    where: {
      aideTerritoireId: aideData.aideTerritoireId,
    },
    update: aideData,
    create: aideData,
  });
  return upsertedAide;
};
