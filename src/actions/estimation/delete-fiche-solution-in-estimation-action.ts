"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { deleteFicheSolutionInEstimation, getEstimationById } from "@/src/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";

export const deleteFicheSolutionInEstimationAction = async (
  estimationId: number,
  ficheSolutionId: number,
): Promise<ResponseAction<{ estimation?: EstimationWithAides; estimationDeleted?: boolean }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const estimation = await getEstimationById(estimationId);
  const permission = new PermissionManager(session);

  if (!estimation || !(await permission.canEditProject(estimation.projet_id))) {
    return { type: "error", message: "ESTIMATION_DELETE_UNAUTHORIZED" };
  }

  try {
    const updatedEstimation = await deleteFicheSolutionInEstimation(estimationId, ficheSolutionId, session.user.id);

    if (updatedEstimation === null) {
      return {
        type: "success",
        message: "ESTIMATION_DELETE",
        estimationDeleted: true,
      };
    }

    return {
      type: "success",
      message: "ESTIMATION_CREATED",
      estimation: updatedEstimation,
    };
  } catch (e) {
    customCaptureException("Error in DeleteFicheSolutionInEstimationAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
