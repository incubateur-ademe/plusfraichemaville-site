import {
  addFicheBookmark,
  deleteBookmarkFiche,
  FicheBookmarkedSolution,
  FichesBookmarked,
  isFicheBookmarked,
  mergeFicheBookmarkedDiagnostic,
  mergeFicheBookmarkedSolutions,
} from "@/components/common/generic-save-fiche/helpers";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { UserProjetWithUser, UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { RoleProjet, User } from "@prisma/client";

export const saveAllFichesFromLocalStorage = async (
  userId: string,
  fiches: {
    fichesSolutions: FichesBookmarked[];
    fichesDiagnostic: FichesBookmarked[];
  },
) => {
  const user = await getUser(userId);

  const currentSavedFichesDiagnostic = user?.selection_fiches_diagnostic;
  const currentSavedFichesSolutions = user?.selection_fiches_solutions;

  const updatedSavedFichesDiagnostic = mergeFicheBookmarkedDiagnostic(
    fiches.fichesDiagnostic,
    currentSavedFichesDiagnostic,
  );

  const updatedSavedFichesSolutions = mergeFicheBookmarkedSolutions(
    fiches.fichesSolutions as FicheBookmarkedSolution[],
    currentSavedFichesSolutions as FicheBookmarkedSolution[],
  );

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      selection_fiches_diagnostic: updatedSavedFichesDiagnostic as number[],
      selection_fiches_solutions: updatedSavedFichesSolutions,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateFichesUser = async (
  ficheId: number,
  userId: string,
  type: "solution" | "diagnostic",
  projectName?: string,
) => {
  const user = await getUserWithCollectivites(userId);
  const selectedByUser =
    type === "solution"
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
      selection_fiches_solutions: type === "solution" ? fichesUpdated : (user?.selection_fiches_solutions as number[]),
      selection_fiches_diagnostic:
        type === "diagnostic" ? (fichesUpdated as number[]) : (user?.selection_fiches_diagnostic as number[]),
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
  canalAcquisition,
}: {
  userId: string;
  userNom: string;
  userPrenom: string;
  userPoste: string;
  collectiviteId: number;
  canalAcquisition?: string;
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
      canal_acquisition: canalAcquisition,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const getUserProjectRole = async (userId: string, projectId: number): Promise<RoleProjet | null> => {
  try {
    const userProject = await prismaClient.user_projet.findUnique({
      where: {
        user_id_projet_id: {
          user_id: userId,
          projet_id: projectId,
        },
      },
      select: {
        role: true,
      },
    });

    return userProject?.role ?? null;
  } catch (error) {
    console.log("Erreur lors de la récuparation du rôle : ", error);
    throw error;
  }
};

export const getOtherAdmins = async (currentUserId: string, projectId: number): Promise<boolean | undefined> => {
  try {
    const otherAdmins = await prismaClient.user_projet.findMany({
      where: {
        projet_id: projectId,
        role: RoleProjet.ADMIN,
        user_id: { not: currentUserId },
      },
    });
    return otherAdmins.length > 0;
  } catch (error) {
    console.log("Erreur lors de la récuparation des autres admins : ", error);
    throw error;
  }
};

export const getOldestProjectAdmin = async (projectId: number) => {
  return prismaClient.user_projet.findFirst({
    where: {
      projet_id: projectId,
      role: RoleProjet.ADMIN,
      deleted_at: null,
    },
    orderBy: {
      created_at: "asc",
    },
    select: {
      user: {
        select: {
          email: true,
        },
      },
      projet: {
        select: {
          nom: true,
        },
      },
    },
  });
};

export const updateUserRoleProject = async (
  userId: string,
  projectId: number,
  newRole: RoleProjet,
): Promise<UserProjetWithUser> => {
  const updatedUserProject = await prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
    },
    data: {
      role: newRole,
    },
    include: {
      user: true,
    },
  });

  return updatedUserProject;
};

export const deleteUserFromProject = async (userId: string, projectId: number, deletedById: string) => {
  const softDeletedUserProject = await prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
    },
    data: {
      deleted_at: new Date(),
      deleted_by: deletedById,
    },
    include: {
      user: true,
    },
  });

  return softDeletedUserProject;
};
