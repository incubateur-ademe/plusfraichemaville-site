"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { EmailProjetPartageConfig, EmailService } from "@/services/brevo";
import { prepareInvitationResend } from "@/lib/prisma/prismaUserQueries";

export const resentInvitationAction = async (
  userProjetId: number,
  projectId: number,
  params: EmailProjetPartageConfig,
): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUserRole = await new PermissionManager().canShareProject(session?.user.id, projectId);

  if (!canUpdateUserRole) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const { userProjet, newEmailId, projectName, type, message } = await prepareInvitationResend(userProjetId);

    if (userProjet?.email_address && projectName) {
      const sent = await new EmailService().sendInvitationEmail(userProjet?.email_address, newEmailId!, params);

      return {
        type: sent.type,
        message: sent.message,
      };
    }
    return { type, message };
  } catch (e) {
    customCaptureException("Error in resending mail DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
