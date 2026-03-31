"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { addFicheDiagnosticSeenToUserProjet, getUserProjet } from "@/src/lib/prisma/prisma-user-projet-queries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const addFicheDiagnosticSeenAction = async (
  userId: string,
  projetId: number,
  ficheDiagnosticId: number,
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

    if (userProjet.fiches_diagnostic_seen?.includes(ficheDiagnosticId)) {
      return { type: "success" };
    }

    await addFicheDiagnosticSeenToUserProjet(userId, projetId, ficheDiagnosticId);

    return { type: "success" };
  } catch (e) {
    customCaptureException("Error adding fiche diagnostic seen to user projet", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
