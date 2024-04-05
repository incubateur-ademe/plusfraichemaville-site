import { mergeBookmarkedFichesSolutions } from "@/app/mon-projet/favoris/helper";
import { FichesBookmarked } from "@/components/common/generic-save-fiche-button/helpers";
import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { User } from "@prisma/client";

export const updateFichesDiagnosticByUser = async (userId: string, ficheDiagnosticIds: number[]) => {
  const user = await getUser(userId);
  const userFichesDiagnostic = user?.selection_fiches_diagnostic;

  let mergedFichesDiagnostic: number[] = [];

  if (userFichesDiagnostic) {
    mergedFichesDiagnostic = Array.from(new Set([...userFichesDiagnostic, ...ficheDiagnosticIds]));
  }

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      selection_fiches_diagnostic: mergedFichesDiagnostic,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateFicheDiagnosticByUser = async (userId: string, ficheDiagnosticIds: FichesBookmarked[]) => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      selection_fiches_diagnostic: ficheDiagnosticIds as number[],
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const deleteUserProjet = (projetId: number) => {
  return prismaClient.projet.delete({
    where: {
      id: projetId,
    },
  });
};

export const getUserProjets = async (userId: string) => {
  return prismaClient.projet.findMany({
    where: {
      created_by: userId,
    },
    include: {
      collectivite: true,
      estimations: true,
      creator: true,
    },
  });
};

export const getBookmarkedFichesSolutions = async (userId: string): Promise<ProjectBookmarks[] | undefined> => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      selection_fiches_solutions: true,
    },
  });

  return user?.selection_fiches_solutions as ProjectBookmarks[];
};

export const saveBookmarkedFicheSolutionsByUser = async (
  userId: string,
  newBookmarkedFichesSolutions: ProjectBookmarks[],
) => {
  const currentSavedFichesSolutions = await getBookmarkedFichesSolutions(userId);
  const oldSavedBookmarFichesSolutions = (currentSavedFichesSolutions as ProjectBookmarks[]) ?? [];
  const updatedBookMarkedFichesSolutions = mergeBookmarkedFichesSolutions(
    oldSavedBookmarFichesSolutions,
    newBookmarkedFichesSolutions,
  );

  const updateBookmarkedFichesSolution = await updateBookmarkedFichesSolutions(
    userId,
    updatedBookMarkedFichesSolutions,
  );

  return updateBookmarkedFichesSolution;
};

export const updateBookmarkedFichesSolutions = async (
  userId: string,
  updatedBookMarkedFichesSolutions: FichesBookmarked[],
) => {
  return await prismaClient.user.update({
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

export const getUser = async (userId: string): Promise<User | null> => {
  return prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async ({
  userId,
  userNom,
  userPrenom,
  userPoste,
  collectiviteId,
}: {
  userId: string;
  userNom: string;
  userPrenom: string;
  userPoste: string;
  collectiviteId: number;
}): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      nom: userNom,
      prenom: userPrenom,
      poste: userPoste,
      collectivites: {
        upsert: {
          where: { userCollectiviteId: { user_id: userId, collectivite_id: collectiviteId } },
          update: {},
          create: { collectivite_id: collectiviteId, verified: false },
        },
      },
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};
