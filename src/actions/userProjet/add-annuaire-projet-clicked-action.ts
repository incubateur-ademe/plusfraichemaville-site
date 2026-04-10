"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import {
  addAnnuaireInProgressProjetClickedToUserProjet,
  addAnnuaireRexProjetClickedToUserProjet,
  getUserProjet,
} from "@/src/lib/prisma/prisma-user-projet-queries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const addAnnuaireProjetClickedAction = async (
  userId: string,
  projetId: number,
  clickedProjetId: number,
  type: "rex" | "in-progress",
): Promise<ResponseAction> => {
  try {
    const session = await auth();

    if (!session) {
      return { type: "error", message: "UNAUTHENTICATED" };
    }

    if (isNaN(+clickedProjetId) || !new PermissionManager(session).canUpdateUser(userId)) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    const userProjet = await getUserProjet(userId, projetId);

    if (!userProjet) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    if (type === "rex") {
      if (userProjet.annuaire_rex_projet_clicked.includes(clickedProjetId)) {
        return { type: "success" };
      }
      await addAnnuaireRexProjetClickedToUserProjet(userId, projetId, clickedProjetId);
    } else {
      if (userProjet.annuaire_in_progess_clicked.includes(clickedProjetId)) {
        return { type: "success" };
      }
      await addAnnuaireInProgressProjetClickedToUserProjet(userId, projetId, clickedProjetId);
    }

    return { type: "success" };
  } catch (e) {
    customCaptureException("Error adding annuaire projet clicked to user projet", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
