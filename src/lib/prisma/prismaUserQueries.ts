import {
  addFicheBookmark,
  deleteBookmarkFiche,
  FicheBookmarkedSolution,
  FichesBookmarked,
  isFicheBookmarked,
  mergeFicheBookmarkedSolutions,
} from "@/src/components/common/generic-save-fiche/helpers";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { UserWithCollectivite, UserWithProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { Prisma, User } from "@prisma/client";
import { IApiSirenQueryTypes } from "@/src/lib/siren/types";
import { TypeFiche } from "@/src/helpers/common";

export const saveAllFichesFromLocalStorage = async (
  userId: string,
  fiches: {
    fichesSolutions: FichesBookmarked[];
  },
) => {
  const user = await getUserById(userId);

  const currentSavedFichesSolutions = user?.selection_fiches_solutions;

  const updatedSavedFichesSolutions = mergeFicheBookmarkedSolutions(
    fiches.fichesSolutions as FicheBookmarkedSolution[],
    currentSavedFichesSolutions as FicheBookmarkedSolution[],
  );

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      selection_fiches_solutions: updatedSavedFichesSolutions,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateFichesUser = async (ficheId: number, userId: string, type: TypeFiche, projectName?: string) => {
  const user = await getUserWithCollectivites(userId);
  const selectedByUser =
    type === TypeFiche.solution
      ? (user?.selection_fiches_solutions as number[])
      : (user?.selection_fiches_diagnostic as number[]);

  const isAlreadySaved = isFicheBookmarked(selectedByUser, ficheId, projectName ?? "");

  const fichesUpdated = isAlreadySaved
    ? deleteBookmarkFiche(type, selectedByUser, +ficheId, projectName ?? "")
    : addFicheBookmark(type, selectedByUser, +ficheId, projectName ?? "");

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      selection_fiches_solutions:
        type === TypeFiche.solution ? fichesUpdated : (user?.selection_fiches_solutions as number[]),
      selection_fiches_diagnostic:
        type === TypeFiche.diagnostic ? (fichesUpdated as number[]) : (user?.selection_fiches_diagnostic as number[]),
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateBookmarkedFichesSolutions = async (
  userId: string,
  updatedBookMarkedFichesSolutions: FichesBookmarked[],
) => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      selection_fiches_solutions: updatedBookMarkedFichesSolutions,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

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
