"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { getUserProjet, updateLastAccessToProjetByUser } from "@/src/lib/prisma/prisma-user-projet-queries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const accessProjetAction = async (userId: string, projectId: number): Promise<ResponseAction> => {
  try {
    const session = await auth();

    if (!session) {
      return { type: "error", message: "UNAUTHENTICATED" };
    }
    const canUpdateUser = new PermissionManager(session).canUpdateUser(userId);

    if (!canUpdateUser) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    const projectLink = await getUserProjet(userId, projectId);
    if (!projectLink) {
      return { type: "error", message: "UNAUTHORIZED" };
    }
    await updateLastAccessToProjetByUser(projectLink);

    return { type: "success" };
  } catch (e) {
    customCaptureException("Error updating project last accessed fields in DB", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
