import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { UserWithProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { Prisma, StatutUser } from "@/src/generated/prisma/client";
import { IApiSirenQueryTypes } from "@/src/lib/siren/types";
import { UserDto, UserWithCollectiviteDto } from "@/src/types/dto";
import { convertUserToDto, convertUserWithCollectiviteToDto } from "./dto-converters";

export const getUserWithCollectivites = async (userId: string): Promise<UserWithCollectiviteDto | null> => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
  return user ? convertUserWithCollectiviteToDto(user) : null;
};

export const getUserById = async (userId: string): Promise<UserDto | null> => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user ? convertUserToDto(user) : null;
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
  canalAcquisition,
  nomEtablissement,
  acceptCommunicationProduit,
  acceptCommunicationSuiviProjet,
}: {
  userId: string;
  userNom: string;
  userPrenom: string;
  userPoste: string;
  acceptCommunicationProduit: boolean;
  acceptCommunicationSuiviProjet: boolean;
  canalAcquisition?: string;
  nomEtablissement?: string;
}): Promise<UserWithCollectiviteDto | null> => {
  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      nom: userNom,
      prenom: userPrenom,
      poste: userPoste,
      accept_communication_produit: acceptCommunicationProduit,
      accept_communication_suivi_projet: acceptCommunicationSuiviProjet,
      canal_acquisition: canalAcquisition,
      nom_etablissement: nomEtablissement,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
  return updatedUser ? convertUserWithCollectiviteToDto(updatedUser) : null;
};

export const updateUserDiscardedInformation = async (
  userId: string,
  updatedModalIds: string[],
): Promise<UserWithCollectiviteDto | null> => {
  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      discardedInformation: updatedModalIds,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
  return updatedUser ? convertUserWithCollectiviteToDto(updatedUser) : null;
};

export const updateUserEtablissementInfo = async (
  userId: string,
  nomEtablissement?: string,
  etablissementInfo?: IApiSirenQueryTypes["etablissement"],
): Promise<UserWithCollectiviteDto | null> => {
  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      nom_etablissement: nomEtablissement,
      siren_info: etablissementInfo as Prisma.JsonObject,
      siren: etablissementInfo?.siren,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
  return updatedUser ? convertUserWithCollectiviteToDto(updatedUser) : null;
};

export const updateUserStatut = async (userId: string, statut: StatutUser): Promise<UserWithCollectiviteDto | null> => {
  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      statut: statut,
      statut_updated_at: new Date(),
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
  return updatedUser ? convertUserWithCollectiviteToDto(updatedUser) : null;
};

export const getCountAllUsers = async () => prismaClient.user.count();

export const updateUserBrowsingDate = async (userId: string): Promise<UserWithCollectiviteDto | null> => {
  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      last_browsing_date: new Date(),
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
  return updatedUser ? convertUserWithCollectiviteToDto(updatedUser) : null;
};
