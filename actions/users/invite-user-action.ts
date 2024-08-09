"use server";

import { auth } from "@/lib/next-auth/auth";
import { PermissionManager } from "@/helpers/permission-manager";
import { getUserByEmail } from "@/lib/prisma/prismaUserQueries";
import { email, InvitationStatus } from "@prisma/client";
import { ResponseAction } from "../actions-types";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/services/brevo";
import { getProjetById } from "@/lib/prisma/prismaProjetQueries";
import { getUserProjetByEmailAndProjet, inviteMember } from "@/lib/prisma/prisma-user-projet-queries";

export const inviteMemberAction = async (
  projectId: number,
  email: string,
): Promise<ResponseAction<{ mail?: email | null }>> => {
  try {
    const session = await auth();
    if (!session) {
      return { type: "error", message: "UNAUTHENTICATED", mail: null };
    }

    const projet = await getProjetById(projectId);
    const canShareProject = await new PermissionManager().canShareProject(session.user.id, projectId);
    if (!canShareProject || !projet) {
      return { type: "error", message: "UNAUTHORIZED", mail: null };
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
        return { type: "error", message: "USER_ALREADY_IN_PROJET", mail: null };
      } else if (existingProjetLink.invitation_status === InvitationStatus.INVITED) {
        return { type: "error", message: "USER_ALREADY_INVITED_IN_PROJET", mail: null };
      } else if (existingProjetLink.invitation_status === InvitationStatus.REQUESTED) {
        return { type: "error", message: "USER_ALREADY_REQUESTED_ACCESS_TO_PROJET", mail: null };
      }
    }

    const invitation = await inviteMember(projectId, email, existingUser?.id);
    if (invitation) {
      const emailService = new EmailService();
      const result = await emailService.sendInvitationEmail(email, projet, invitation);
      revalidatePath(`/espace-projet/${projectId}`);
      return { type: "success", message: "EMAIL_SENT", mail: result.email };
    }
    return { type: "error", message: "TECHNICAL_ERROR" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'invitation:", error);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
