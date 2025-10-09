import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { ProjetWithRelations, UserWithCollectivite, UserWithProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { Prisma, StatutProjet, StatutUser, User } from "@/src/generated/prisma/client";
import { IApiSirenQueryTypes } from "@/src/lib/siren/types";
import { projetIncludes } from "@/src/lib/prisma/prismaProjetQueries";

export const getUserWithCollectivites = async (userId: string): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const getUserById = async (userId: string): Promise<User | null> => {
  return prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const getUserByEmail = async (userEmail: string): Promise<UserWithProjets | null> => {
  return prismaClient.user.findUnique({
    where: {
      email: userEmail,
    },
    include: { projets: { where: { deleted_at: null }, include: { projet: true } } },
  });
};

export const updateUser = async ({
  userId,
  userNom,
  userPrenom,
  userPoste,
  collectiviteId,
  canalAcquisition,
  nomEtablissement,
  acceptCommunicationProduit,
}: {
  userId: string;
  userNom: string;
  userPrenom: string;
  userPoste: string;
  collectiviteId: number;
  acceptCommunicationProduit: boolean;
  canalAcquisition?: string;
  nomEtablissement?: string;
}): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      nom: userNom,
      prenom: userPrenom,
      poste: userPoste,
      accept_communication_produit: acceptCommunicationProduit,
      collectivites: {
        upsert: {
          where: { userCollectiviteId: { user_id: userId, collectivite_id: collectiviteId } },
          update: {},
          create: { collectivite_id: collectiviteId, verified: false },
        },
      },
      canal_acquisition: canalAcquisition,
      nom_etablissement: nomEtablissement,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateUserDiscardedInformation = async (
  userId: string,
  updatedModalIds: string[],
): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      discardedInformation: updatedModalIds,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateUserEtablissementInfo = async (
  userId: string,
  nomEtablissement?: string,
  etablissementInfo?: IApiSirenQueryTypes["etablissement"],
): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      nom_etablissement: nomEtablissement,
      siren_info: etablissementInfo as Prisma.JsonObject,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateUserStatut = async (userId: string, statut: StatutUser): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      statut: statut,
      statut_updated_at: new Date(),
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};
