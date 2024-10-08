"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { deleteEstimation, getEstimationById } from "@/src/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const deleteEstimationAction = async (estimationId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const estimationToDelete = await getEstimationById(estimationId);

  if (!estimationToDelete) {
    return { type: "success", message: "ESTIMATION_DELETE" };
  }

  const canUpdateProjet = await new PermissionManager(session).canEditProject(estimationToDelete.projet_id);
  if (!canUpdateProjet) {
    return { type: "error", message: "ESTIMATION_DELETE_UNAUTHORIZED" };
  }

  try {
    await deleteEstimation(estimationId, session.user.id);
  } catch (e) {
    customCaptureException("Error in DeleteEstimationAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }

  return { type: "success", message: "ESTIMATION_DELETE" };
};
