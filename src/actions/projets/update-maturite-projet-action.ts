"use server";

import { NiveauMaturite } from "@/src/helpers/maturite-projet";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateMaturiteProjet } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";

export const updateMaturiteProjetAction = async (
  projetId: number,
  niveauMaturite: NiveauMaturite["code"],
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
    const projet = await updateMaturiteProjet(projetId, niveauMaturite);

    if (projet) {
      await createAnalytic({
        context: {
          maturite: projet.niveau_maturite,
        },
        event_type: "UPDATE_MATURITE",
        reference_id: projet?.id?.toString(),
        reference_type: "PROJET",
        user_id: session.user.id,
      });
    }

    return {
      type: "success",
      message: "MATURITE_PROJET_UPDATED",
      projet,
    };
  } catch (e) {
    customCaptureException("Error in updateMaturiteProjetAction", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};
