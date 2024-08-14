"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { leaveProject } from "@/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/helpers/permission-manager";

export const leaveProjetAction = async (userId: string, projetId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const permissionManager = new PermissionManager();

  const canUpdateUser = permissionManager.canUpdateUser(session.user.id, userId);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    if (
      (await permissionManager.isAdmin(userId, projetId)) &&
      !(await permissionManager.checkOtherAdminsExist(userId, projetId))
    ) {
      return { type: "error", message: "PROJET_MUST_HAVE_ONE_ADMIN" };
    }
    const result = await leaveProject(userId, projetId);
    if (result) {
      return { type: "success", message: "QUIT_PROJET" };
    } else {
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  } catch (e) {
    customCaptureException("Error in leaveProjet DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
