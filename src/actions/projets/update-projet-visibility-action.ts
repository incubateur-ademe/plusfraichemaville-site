"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateProjetVisibility } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const updateProjetVisibilityAction = async (
  projetId: number,
  visible: boolean,
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
    const projet = await updateProjetVisibility(projetId, visible);
    return {
      type: "success",
      message: "VISIBILITY_UPDATED",
      projet,
    };
  } catch (e) {
    customCaptureException("Error in updateProjetVisibility DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};