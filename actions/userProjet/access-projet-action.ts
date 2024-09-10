"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { getUserProjet, updateLastAccessToProjetByUser } from "@/lib/prisma/prisma-user-projet-queries";

export const accessProjetAction = async (projectId: number): Promise<ResponseAction> => {
  try {
    const session = await auth();

    if (!session) {
      return { type: "error", message: "UNAUTHENTICATED" };
    }
    const userId = session.user.id;

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
