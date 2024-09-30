"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { declineProjectInvitation } from "@/src/lib/prisma/prisma-user-projet-queries";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";

export const declineProjectInvitationAction = async (userId: string, projectId: number): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = new PermissionManager(session).canUpdateUser(userId);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const decline = await declineProjectInvitation(userId, projectId, session.user.id);
    if (decline) {
      await createAnalytic({
        context: {},
        event_type: "DECLINE_INVITATION",
        reference_id: projectId,
        reference_type: "USER",
        userId: session.user.id,
      });
    }
    return { type: "success", message: "DECLINE_INVITATION_PROJECT_ACCESS" };
  } catch (e) {
    customCaptureException("Error in decline invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
