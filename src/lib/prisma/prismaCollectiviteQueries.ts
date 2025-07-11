import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { AddressCollectivite } from "@/src/lib/adresseApi/types";
import { Prisma } from "@/src/generated/prisma/client";
import { generateRandomId } from "@/src/helpers/common";

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
      adresse_all_infos: data.banInfo as Prisma.JsonObject,
      latitude: data.lat,
      longitude: data.long,
      created_by: creatorUserId,
      id: generateRandomId(),
    },
    update: {},
  });
};

export const createCollectiviteByName = async (collectiviteName: string, creatorUserId: string) => {
  return prismaClient.collectivite.create({
    data: {
      id: generateRandomId(),
      nom: collectiviteName,
      created_by: creatorUserId,
    },
  });
};

export const updateCollectiviteAidesTerritoireId = async (
  collectiviteId: number,
  aidesTerritoiresPerimeterId: string,
) => {
  return prismaClient.collectivite.update({
    where: {
      id: collectiviteId,
    },
    data: {
      aides_territoires_perimeter_id: aidesTerritoiresPerimeterId,
    },
  });
};

export const getCollectiviteById = async (idCollectivite: number) => {
  return prismaClient.collectivite.findUnique({
    where: {
      id: idCollectivite,
    },
  });
};
