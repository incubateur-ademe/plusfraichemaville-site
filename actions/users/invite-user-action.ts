"use server";

import { auth } from "@/lib/next-auth/auth";
import { PermissionManager } from "@/helpers/permission-manager";
import { inviteMember } from "@/lib/prisma/prismaUserQueries";
import { RoleProjet, email } from "@prisma/client";
import { sendInvitationAction } from "../emails/send-invitation-email-action";
import { ResponseAction } from "../actions-types";
import { revalidatePath } from "next/cache";

export const inviteMemberAction = async (
  projectId: number,
  email: string,
  projectName: string,
  role: RoleProjet,
): Promise<ResponseAction<{ mail?: email | null }>> => {
  try {
    const session = await auth();
    if (!session) {
      return { type: "error", message: "UNAUTHENTICATED", mail: null };
    }

    const canShareProject = await new PermissionManager().canShareProject(session.user.id, projectId);
    if (!canShareProject) {
      return { type: "error", message: "UNAUTHORIZED", mail: null };
    }

    const invitation = await inviteMember(projectId, email, role);
    if (invitation) {
      const result = await sendInvitationAction(
        email,
        projectName,
        invitation.userProject.invitation_token,
        invitation.invitationEmail.id,
      );
      revalidatePath(`/espace-projet/${projectId}`);
      return { type: "success", message: "EMAIL_SENT", mail: result.mail };
    }
    return { type: "error", message: "TECHNICAL_ERROR" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'invitation:", error);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
