"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { leaveProject } from "@/src/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";

export const leaveProjetAction = async (userId: string, projetId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const permissionManager = new PermissionManager(session);

  const canUpdateUser = permissionManager.canUpdateUser(userId);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    if (
      (await permissionManager.isAdmin(projetId)) &&
      !(await permissionManager.checkOtherAdminsExist(projetId, userId))
    ) {
      return { type: "error", message: "PROJET_MUST_HAVE_ONE_ADMIN" };
    }
    const result = await leaveProject(userId, projetId);
    if (result) {
      if (result) {
        await createAnalytic({
          context: {
            role: result.role,
          },
          event_type: "LEAVE_PROJET",
          reference_id: result?.id,
          reference_type: "PROJET",
          userId: session.user.id,
        });
      }
      return { type: "success", message: "QUIT_PROJET" };
    } else {
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  } catch (e) {
    customCaptureException("Error in leaveProjet DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
