"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateFichesProjet } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const updateFichesProjetAction = async (
  projetId: number,
  ficheId: number,
  type: "solution" | "diagnostic",
): Promise<ResponseAction<{ projet: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }

  const canUpdateProjet = await new PermissionManager(session).canEditProject(projetId);

  if (!canUpdateProjet) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  try {
    const projet = await updateFichesProjet(projetId, ficheId, session.user.id, type);
    const eventType = type === "solution" ? "AJOUT_FICHE_SOLUTION" : "AJOUT_FICHE_DIAGNOSTIC";

    return {
      type: "success",
      message: eventType,
      projet,
    };
  } catch (e) {
    customCaptureException("Error in updateFichesProjet DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};
