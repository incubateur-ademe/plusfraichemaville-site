"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateFichesProjet } from "@/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";

export const updateFichesProjetAction = async (
  projetId: number,
  ficheId: number,
  type: "solution" | "diagnostic",
): Promise<ResponseAction<{ projet: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }

  const canUpdateProjet = await new PermissionManager().canEditProject(session.user.id, projetId);

  if (!canUpdateProjet) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  try {
    const projet = await updateFichesProjet(projetId, ficheId, session.user.id, type);
    return {
      type: "success",
      message: type === "solution" ? "FICHE_SOLUTION_ADDED_TO_PROJET" : "FICHE_DIAGNOSTIC_ADDED_TO_PROJET",
      projet,
    };
  } catch (e) {
    customCaptureException("Error in updateFichesProjet DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};
