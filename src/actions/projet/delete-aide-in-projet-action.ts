"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { EventType, Prisma, ReferenceType } from "@/src/generated/prisma/client";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { deleteAideInProjet } from "@/src/lib/prisma/prisma-projet-aides-queries";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";
import { UPDATE_PROJET_CONTEXT_ACTIONS } from "@/src/components/analytics/helpers";

export const deleteAideInProjetAction = async (
  projetId: number,
  aideId: number,
): Promise<ResponseAction<{ projetAide?: ProjetAideWithAide | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (!aideId) {
    return { type: "success", message: "PROJET_AIDE_DELETED" };
  }

  const permission = new PermissionManager(session);

  if (!(await permission.canEditProject(projetId))) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  try {
    const projetAide = await deleteAideInProjet(projetId, aideId);

    await createAnalytic({
      context: { action: UPDATE_PROJET_CONTEXT_ACTIONS.REMOVE_AIDE },
      event_type: EventType.UPDATE_PROJET,
      reference_id: projetId.toString(),
      reference_type: ReferenceType.PROJET,
      user_id: session.user.id,
    });

    return { type: "success", message: "PROJET_AIDE_DELETED", projetAide };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return { type: "success", message: "PROJET_AIDE_DELETED", projetAide: null };
      }
    }
    customCaptureException("Error in deleteAideInProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
