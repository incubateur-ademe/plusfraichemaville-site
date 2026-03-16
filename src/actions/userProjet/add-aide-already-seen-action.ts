"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { addAideAlreadySeenToUserProjet, getUserProjet } from "@/src/lib/prisma/prisma-user-projet-queries";
import { UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const addAideAlreadySeenAction = async (
  userId: string,
  projetId: number,
  aideTerritoireId: number,
): Promise<ResponseAction<{ userProjet?: UserProjetWithUser }>> => {
  try {
    const session = await auth();

    if (!session) {
      return { type: "error", message: "UNAUTHENTICATED" };
    }

    if (!new PermissionManager(session).canUpdateUser(userId)) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    const userProjet = await getUserProjet(userId, projetId);

    if (!userProjet) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    if (userProjet.aides_already_seen.includes(aideTerritoireId)) {
      return { type: "success" };
    }

    const updatedUserProjet = await addAideAlreadySeenToUserProjet(userId, projetId, aideTerritoireId);

    return { type: "success", userProjet: updatedUserProjet };
  } catch (e) {
    customCaptureException("Error adding aide already seen to user projet", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
