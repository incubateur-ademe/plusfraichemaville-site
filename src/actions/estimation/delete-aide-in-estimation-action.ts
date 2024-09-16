"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { deleteAideInEstimation, getEstimationById } from "@/src/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EstimationAide } from "@/src/lib/prisma/prismaCustomTypes";
import { Prisma } from "@prisma/client";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const deleteAideInEstimationAction = async (
  estimationId: number,
  aideId: number,
): Promise<ResponseAction<{ estimationAide?: EstimationAide | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const estimation = await getEstimationById(estimationId);

  if (!aideId) {
    return { type: "success", message: "ESTIMATION_AIDE_DELETED" };
  }

  if (!estimation) {
    return { type: "error", message: "ESTIMATION_DOESNT_EXIST" };
  }

  const permission = new PermissionManager(session);

  if (!(await permission.canEditProject(estimation.projet_id))) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  try {
    const estimationAide = await deleteAideInEstimation(estimationId, aideId);

    return { type: "success", message: "ESTIMATION_AIDE_DELETED", estimationAide };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return { type: "success", message: "ESTIMATION_AIDE_DELETED", estimationAide: null };
      }
    }
    customCaptureException("Error in deleteAideInEstimationAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
