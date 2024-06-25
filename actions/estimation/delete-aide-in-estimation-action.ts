"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { deleteAideInEstimation, getEstimationById } from "@/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";

import { estimations_aides } from "@prisma/client";

export const deleteAideInEstimationAction = async (
  estimationId: number,
  aideId: number,
): Promise<ResponseAction<{ estimationAide?: estimations_aides }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const estimation = await getEstimationById(estimationId);

  if (!estimation) {
    return { type: "error", message: "ESTIMATION_DOESNT_EXIST" };
  }

  if (!(await hasPermissionToUpdateProjet(estimation.projet_id, session.user.id))) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const estimationAide = await deleteAideInEstimation(estimationId, aideId);
    if (estimationAide) {
      return { type: "success", message: "ESTIMATION_UPDATED", estimationAide };
    }

    return { type: "error", message: "TECHNICAL_ERROR" };
  } catch (e) {
    customCaptureException("Error in updateAideInEstimation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
