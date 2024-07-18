"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { revalidatePath } from "next/cache";
import { declineProjectInvitation } from "@/lib/prisma/prismaUserQueries";

export const declineProjectInvitationAction = async (userId: string, projectId: number): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = await new PermissionManager().canUpdateUser(userId, session.user.id);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const accept = await declineProjectInvitation(userId, projectId);
    revalidatePath(`/espace-projet/${projectId}`);
    if (accept) {
      return {
        type: "success",
        message: "DECLINDED_INVITATION",
      };
    } else
      return {
        type: "error",
        message: "TECHNICAL_ERROR",
      };
  } catch (e) {
    customCaptureException("Error in decline invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
