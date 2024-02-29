import { User } from "@prisma/client";
import { prismaClient } from "@/lib/prisma/prismaClient";

export const getOrCreateCollectivite = async (siret: string, nom: string, codePostal: string, createdBy: User) => {
  const collectivite = await prismaClient.collectivite.findUnique({
    where: {
      siret: siret,
    },
  });
  if (collectivite) {
    return collectivite;
  } else {
    return prismaClient.collectivite.create({
      data: {
        siret: siret,
        nom: nom,
        code_postal: codePostal,
        created_by: createdBy.id,
      },
    });
  }
};

export const createOrUpdateCollectivite = async (
  siret: string,
  nom: string,
  codePostal: string,
  userCreatorId: string,
) => {
  const collectivite = await prismaClient.collectivite.findUnique({
    where: {
      siret,
    },
  });
  return prismaClient.collectivite.upsert({
    where: {
      siret,
    },
    create: {
      siret,
      nom,
      code_postal: codePostal,
      created_by: userCreatorId,
    },
    update: {
      nom: collectivite?.nom ?? nom,
      code_postal: collectivite?.code_postal ?? codePostal,
    },
  });
};
