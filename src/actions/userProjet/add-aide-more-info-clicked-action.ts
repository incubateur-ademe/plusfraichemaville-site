"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { addAideMoreInfoClickedToUserProjet, getUserProjet } from "@/src/lib/prisma/prisma-user-projet-queries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const addAideMoreInfoClickedAction = async (
  userId: string,
  projetId: number,
  aideTerritoireId: number,
): Promise<ResponseAction> => {
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

    if (userProjet.aides_more_info_clicked.includes(aideTerritoireId)) {
      return { type: "success" };
    }

    await addAideMoreInfoClickedToUserProjet(userId, projetId, aideTerritoireId);

    return { type: "success" };
  } catch (e) {
    customCaptureException("Error adding aide more info clicked to user projet", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
