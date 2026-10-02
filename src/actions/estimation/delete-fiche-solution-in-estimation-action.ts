"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { deleteFicheSolutionInEstimation, getEstimationById } from "@/src/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";
import { UPDATE_PROJET_CONTEXT_ACTIONS } from "@/src/components/analytics/helpers";
import { EventType, ReferenceType } from "@/src/generated/prisma/client";

export const deleteFicheSolutionInEstimationAction = async (
  estimationId: number,
  ficheSolutionId: string,
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
    await createAnalytic({
      context: { action: UPDATE_PROJET_CONTEXT_ACTIONS.UPDATE_ESTIMATION },
      event_type: EventType.UPDATE_PROJET,
      reference_id: estimation.projet_id.toString(),
      reference_type: ReferenceType.PROJET,
      user_id: session.user.id,
    });

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
