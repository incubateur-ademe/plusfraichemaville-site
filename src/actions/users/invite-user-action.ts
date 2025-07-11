"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getUserByEmail, getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { InvitationStatus, RoleProjet } from "@/src/generated/prisma/client";
import { ResponseAction } from "../actions-types";
import { EmailService } from "@/src/services/brevo";
import { getProjetById, getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { getUserProjetByEmailAndProjet, inviteMember } from "@/src/lib/prisma/prisma-user-projet-queries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

export const inviteMemberAction = async (
  projectId: number,
  email: string,
  role: RoleProjet,
): Promise<ResponseAction<{ updatedProjet?: ProjetWithRelations | null }>> => {
  try {
    const session = await auth();
    if (!session) {
      return { type: "error", message: "UNAUTHENTICATED", updatedProjet: null };
    }
    const currentUser = await getUserWithCollectivites(session.user.id);

    const projet = await getProjetById(projectId);
    const canShareProject = await new PermissionManager(session).canShareProject(projectId);

    if (!canShareProject || !projet || !currentUser) {
      return { type: "error", message: "UNAUTHORIZED", updatedProjet: null };
    }

    const existingUser = await getUserByEmail(email);
    let existingProjetLink;
    if (existingUser) {
      existingProjetLink = existingUser.projets.find((projet) => projet.projet_id === projectId);
    } else {
      existingProjetLink = await getUserProjetByEmailAndProjet(email, projectId);
    }

    if (existingProjetLink) {
      if (existingProjetLink.invitation_status === InvitationStatus.ACCEPTED) {
        return { type: "error", message: "USER_ALREADY_IN_PROJET", updatedProjet: null };
      } else if (existingProjetLink.invitation_status === InvitationStatus.INVITED) {
        return { type: "error", message: "USER_ALREADY_INVITED_IN_PROJET", updatedProjet: null };
      } else if (existingProjetLink.invitation_status === InvitationStatus.REQUESTED) {
        return { type: "error", message: "USER_ALREADY_REQUESTED_ACCESS_TO_PROJET", updatedProjet: null };
      }
    }

    const invitation = await inviteMember(projectId, email, role, existingUser?.id);
    if (invitation) {
      const emailService = new EmailService();
      await emailService.sendInvitationEmail(email, invitation, currentUser);
      const updatedProjet = await getProjetWithRelationsById(projectId);
      return { type: "success", message: "EMAIL_SENT", updatedProjet: updatedProjet };
    }
    return { type: "error", message: "TECHNICAL_ERROR" };
  } catch (error) {
    customCaptureException("Erreur lors de l'envoi de l'invitation", error);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
