"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { EmailService } from "@/services/brevo";
import { prepareInvitationResend } from "@/lib/prisma/prismaUserQueries";

export const resentInvitationAction = async (
  userId: string,
  userProjetId: number,
  projectId: number,
): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUserRole = await new PermissionManager().canUpdateUserRole(session?.user.id, userId, projectId);

  if (!canUpdateUserRole) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const { userProjet, newEmailId, projectName, newInvitationToken, type, message } =
      await prepareInvitationResend(userProjetId);

    if (userProjet?.email_address && projectName) {
      const sent = await new EmailService().sendInvitationEmail(
        userProjet?.email_address,
        projectName,
        newInvitationToken,
        newEmailId,
      );

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
