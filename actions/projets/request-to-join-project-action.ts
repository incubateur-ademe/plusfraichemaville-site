"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/services/brevo";
import { requestToJoinProject } from "@/lib/prisma/prismaUserQueries";

export const requestToJoinProjectAction = async (
  userId: string,
  projectId: number,
  email: string,
): Promise<ResponseAction> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = await new PermissionManager().canUpdateUser(userId, session.user.id);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const request = await requestToJoinProject(userId, projectId, email);
    if (request) {
      revalidatePath(`/espace-projet/${projectId}`);

      if (request) {
        const emailService = new EmailService();
        await emailService.sendRequestAccessEmail(
          projectId,
          request.requesterName,
          request.invitationToken,
          request.emailId,
        );
      }
      return {
        type: "success",
        message: "REQUEST_SENT",
      };
    } else {
      return {
        type: "error",
        message: "TECHNICAL_ERROR",
      };
    }
  } catch (e) {
    customCaptureException("Error in request to join project DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
