import { prismaClient } from "@/lib/prisma/prismaClient";
import { AddressCollectivite } from "@/lib/adresseApi/types";
import { Prisma } from "@prisma/client";

export const getCollectivite = async (collectiviteId: number) => {
  return prismaClient.collectivite.findUnique({
    where: {
      id: collectiviteId,
    },
  });
};

export const getOrCreateCollectivite = async (data: AddressCollectivite, creatorUserId: string) => {
  return prismaClient.collectivite.upsert({
    where: {
      code_insee: data.codeInsee,
    },
    create: {
      nom: data.nomCollectivite,
      code_postal: data.codePostal,
      code_insee: data.codeInsee,
      ban_id: data.banId,
      adresse_info: data.banInfo as Prisma.JsonObject,
      latitude: data.lat,
      longitude: data.long,
      created_by: creatorUserId,
    },
    update: {},
  });
};

export const createCollectiviteByName = async (collectiviteName: string, creatorUserId: string) => {
  return prismaClient.collectivite.create({
    data: {
      nom: collectiviteName,
      created_by: creatorUserId,
    },
  });
};
