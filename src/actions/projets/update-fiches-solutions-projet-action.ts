"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateFichesSolutionsProjet } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const updateFichesSolutionsProjetAction = async (
  projetId: number,
  fichesSolutionsId: number[],
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
    const projet = await updateFichesSolutionsProjet(projetId, fichesSolutionsId, session.user.id);
    return { type: "success", message: "FICHES_SOLUTIONS_ADDED_TO_PROJET", projet };
  } catch (e) {
    customCaptureException("Error in UpdateFichesSolutionsProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};
