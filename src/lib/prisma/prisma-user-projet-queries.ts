import { InvitationStatus, RoleProjet, User, user_projet } from "@prisma/client";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { UserProjetWithRelations, UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import { projetPublicSelect, projetUpdated } from "@/src/lib/prisma/prismaProjetQueries";

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
export const getUserProjetById = async (userProjetId: number): Promise<UserProjetWithRelations | null> => {
  return prismaClient.user_projet.findUnique({
    where: {
      id: userProjetId,
      deleted_at: null,
    },
    include: {
      projet: { include: { collectivite: true } },
      user: { include: { collectivites: { include: { collectivite: true } } } },
    },
  });
};

export const getUserProjetByEmailAndProjet = async (
  userEmail: string,
  projectId: number,
): Promise<user_projet | null> => {
  return prismaClient.user_projet.findFirst({
    where: {
      projet_id: projectId,
      email_address: userEmail,
      deleted_at: null,
    },
  });
};

export const attachInvitationsByEmail = async (userEmail: string, userId: string) => {
  return prismaClient.user_projet.updateMany({
    where: {
      email_address: userEmail,
      user_id: null,
      deleted_at: null,
    },
    data: {
      user_id: userId,
      invitation_token: null,
    },
  });
};

export const attachInvitationsByToken = async (invitationId: number, invitationToken: string, user: User) => {
  return prismaClient.user_projet.update({
    where: {
      id: invitationId,
      invitation_token: invitationToken,
      user_id: null,
      deleted_at: null,
    },
    data: {
      user_id: user.id,
      invitation_token: null,
      email_address: user.email,
    },
    select: { projet: { select: projetPublicSelect } },
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
  const response = prismaClient.user_projet.update({
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

  await projetUpdated(projectId);

  return response;
};

export const deleteUserFromProject = async (
  userId: string,
  projectId: number,
  deletedById: string,
): Promise<UserProjetWithUser | null> => {
  const response = await prismaClient.user_projet.update({
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
      invitation_status: InvitationStatus.DECLINED,
    },
    include: {
      user: true,
    },
  });

  await projetUpdated(response.projet_id);

  return response;
};

export const acceptProjectInvitation = async (userId: string, projectId: number): Promise<user_projet | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
      invitation_status: InvitationStatus.INVITED,
    },
    data: {
      invitation_status: InvitationStatus.ACCEPTED,
      invitation_token: null,
    },
  });
};

export const declineProjectInvitation = async (
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
      invitation_status: InvitationStatus.INVITED,
      deleted_at: null,
    },
    data: {
      invitation_status: InvitationStatus.DECLINED,
      deleted_at: new Date(),
      deleted_by: deletedBy,
      invitation_token: null,
    },
  });
};

export const acceptProjectRequest = async (
  userId: string,
  projectId: number,
): Promise<UserProjetWithRelations | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
      invitation_status: InvitationStatus.REQUESTED,
    },
    data: {
      invitation_status: InvitationStatus.ACCEPTED,
      invitation_token: null,
    },
    include: {
      projet: { include: { collectivite: true } },
      user: { include: { collectivites: { include: { collectivite: true } } } },
    },
  });
};

export const declineProjectRequest = async (
  userId: string,
  projectId: number,
  deletedBy: string,
): Promise<UserProjetWithRelations | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
      invitation_status: InvitationStatus.REQUESTED,
    },
    data: {
      invitation_status: InvitationStatus.DECLINED,
      deleted_at: new Date(),
      deleted_by: deletedBy,
      invitation_token: null,
    },
    include: {
      projet: { include: { collectivite: true } },
      user: { include: { collectivites: { include: { collectivite: true } } } },
    },
  });
};

export const inviteMember = async (
  projectId: number,
  email: string,
  userId?: string,
): Promise<UserProjetWithRelations> => {
  const response = await prismaClient.user_projet.upsert({
    where: { user_id_projet_id: { projet_id: projectId, user_id: userId ?? "" }, email_address: email },
    create: {
      email_address: email,
      projet_id: projectId,
      user_id: userId,
      role: RoleProjet.LECTEUR,
      invitation_status: InvitationStatus.INVITED,
    },
    update: {
      role: RoleProjet.LECTEUR,
      invitation_status: InvitationStatus.INVITED,
      deleted_at: null,
      deleted_by: null,
      created_at: new Date(),
    },
    include: {
      projet: { include: { collectivite: true } },
      user: { include: { collectivites: { include: { collectivite: true } } } },
    },
  });

  await projetUpdated(response.projet_id);

  return response;
};

export const renewOrCreateProjectJoinRequest = async (
  projectId: number,
  user: User,
): Promise<UserProjetWithRelations> => {
  const response = await prismaClient.user_projet.upsert({
    where: { user_id_projet_id: { projet_id: projectId, user_id: user.id } },
    create: {
      email_address: user.email,
      projet_id: projectId,
      user_id: user.id,
      role: RoleProjet.LECTEUR,
      invitation_status: InvitationStatus.REQUESTED,
    },
    update: {
      invitation_status: InvitationStatus.REQUESTED,
      deleted_at: null,
      deleted_by: null,
    },
    include: {
      projet: { include: { collectivite: true } },
      user: { include: { collectivites: { include: { collectivite: true } } } },
    },
  });

  await projetUpdated(response.projet_id);

  return response;
};

export const updateLastAccessToProjetByUser = async (userProjetLink: user_projet): Promise<user_projet> => {
  return prismaClient.user_projet.update({
    where: { id: userProjetLink.id },
    data: {
      last_viewed_at: new Date(),
      nb_views: (userProjetLink.nb_views || 0) + 1,
    },
  });
};
