"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { leaveProject } from "@/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/helpers/permission-manager";

export const leaveProjectAction = async (userId: string, projetId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const canUpdateProjet = await new PermissionManager().canUpdateUser(session.user.id, userId);

  if (!canUpdateProjet) {
    return { type: "error", message: "TECHNICAL_ERROR" };
  }

  try {
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
