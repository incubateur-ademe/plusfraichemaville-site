import { RoleProjet, user_projet } from "@prisma/client";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";

export const getUserProjet = async (userId: string, projectId: number): Promise<user_projet | null> => {
  return prismaClient.user_projet.findUnique({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
    },
  });
};

export const getOtherAdmins = async (currentUserId: string, projectId: number): Promise<user_projet[]> => {
  return prismaClient.user_projet.findMany({
    where: {
      projet_id: projectId,
      role: RoleProjet.ADMIN,
      user_id: { not: currentUserId },
      deleted_at: null,
    },
  });
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
): Promise<UserProjetWithUser | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
    },
    data: {
      role: newRole,
    },
    include: {
      user: true,
    },
  });
};

export const deleteUserFromProject = async (
  userId: string,
  projectId: number,
  deletedById: string,
): Promise<UserProjetWithUser | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
    },
    data: {
      deleted_at: new Date(),
      deleted_by: deletedById,
      invitation_status: "DECLINED",
    },
    include: {
      user: true,
    },
  });
};

export const acceptProjectInvitation = async (userId: string, projectId: number): Promise<user_projet | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
      invitation_status: "INVITED",
    },
    data: {
      invitation_status: "ACCEPTED",
    },
  });
};

export const declineProjectInvitation = async (userId: string, projectId: number): Promise<user_projet | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      invitation_status: "INVITED",
      deleted_at: null,
    },
    data: {
      invitation_status: "DECLINED",
      //TODO Doit on également supprimer l'invitation, ou bien on doit l'afficher au statut declined dans le tableau?
    },
  });
};

export const acceptProjectRequest = async (userId: string, projectId: number): Promise<user_projet | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
      invitation_status: "REQUESTED",
    },
    data: {
      invitation_status: "ACCEPTED",
    },
  });
};

export const declineProjectRequest = async (
  userId: string,
  projectId: number,
  deletedBy: string,
): Promise<user_projet | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
      invitation_status: "REQUESTED",
    },
    data: {
      invitation_status: "DECLINED",
      //TODO Doit on également supprimer la demande, ou bien on doit l'afficher au statut declined dans le tableau?
      deleted_at: new Date(),
      deleted_by: deletedBy,
    },
  });
};
