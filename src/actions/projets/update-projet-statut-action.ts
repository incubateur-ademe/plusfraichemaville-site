"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateProjetStatut } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";
import { EventType, ReferenceType, StatutProjet } from "@/src/generated/prisma/client";

export const updateProjetStatutAction = async (
  projetId: number,
  statut: StatutProjet,
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
    const projet = await updateProjetStatut(projetId, statut);
    if (projet) {
      await createAnalytic({
        context: {},
        event_type: EventType.UPDATE_STATUT_PROJET,
        reference_id: projetId,
        reference_type: ReferenceType.PROJET,
        user_id: session.user.id,
      });
    }
    return {
      type: "success",
      message: "PROJET_STATUT_UPDATED",
      projet,
    };
  } catch (e) {
    customCaptureException("Error in updateProjetStatutAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};
