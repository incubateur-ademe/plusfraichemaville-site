"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { deleteProjet } from "@/src/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const deleteProjetAction = async (projetId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const canDeleteProject = await new PermissionManager(session).canDeleteProject(projetId);

  if (!canDeleteProject) {
    return { type: "error", message: "PROJET_DELETE_UNAUTHORIZED" };
  }

  try {
    await deleteProjet(projetId, session.user.id);
  } catch (e) {
    customCaptureException("Error in DeleteProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }

  return { type: "success", message: "PROJET_DELETE" };
};
