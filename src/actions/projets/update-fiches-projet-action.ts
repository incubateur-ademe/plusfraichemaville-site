"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateFichesProjet } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { TypeFiche, TypeUpdate } from "@/src/helpers/common";

export const updateFichesProjetAction = async (
  projetId: number,
  ficheId: number,
  typeFiche: TypeFiche,
  typeUpdate: TypeUpdate,
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
    const projet = await updateFichesProjet(projetId, ficheId, session.user.id, typeFiche, typeUpdate);
    const message =
      typeFiche === TypeFiche.solution ? "FICHE_SOLUTION_ADDED_TO_PROJET" : "FICHE_DIAGNOSTIC_ADDED_TO_PROJET";

    return {
      type: "success",
      message,
      projet,
    };
  } catch (e) {
    customCaptureException("Error in updateFichesProjet DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};
