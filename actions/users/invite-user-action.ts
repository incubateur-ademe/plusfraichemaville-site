"use server";

import { auth } from "@/lib/next-auth/auth";
import { PermissionManager } from "@/helpers/permission-manager";
import { inviteMember } from "@/lib/prisma/prismaUserQueries";
import { email, RoleProjet } from "@prisma/client";
import { ResponseAction } from "../actions-types";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/services/brevo";
import { getProjetById } from "@/lib/prisma/prismaProjetQueries";

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

    const invitation = await inviteMember(projectId, email);
    if (invitation) {
      const emailService = new EmailService();
      const result = await emailService.sendInvitationEmail(
        email,
        projet.nom,
        invitation.userProject.invitation_token,
        invitation.invitationEmail.id,
      );
      revalidatePath(`/espace-projet/${projectId}`);
      return { type: "success", message: "EMAIL_SENT", mail: result.email };
    }
    return { type: "error", message: "TECHNICAL_ERROR" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'invitation:", error);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
