"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EstimationFormData, EstimationFormSchema } from "@/src/forms/estimation/EstimationFormSchema";
import { addFichesSolutionsToEstimation } from "@/src/lib/prisma/prismaEstimationQueries";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { getFicheSolutionByIdsComplete } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";
import { UPDATE_PROJET_CONTEXT_ACTIONS } from "@/src/components/analytics/helpers";
import { EventType, ReferenceType } from "@/src/generated/prisma/client";

export const addFichesSolutionsToEstimationAction = async (
  estimationId: number,
  data: EstimationFormData,
): Promise<ResponseAction<{ estimation?: EstimationWithAides }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const parseParamResult = EstimationFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("addFichesSolutionsToEstimationAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  }

  const fichesSolutions = await getFicheSolutionByIdsComplete(data.ficheSolutionIds);

  try {
    const estimation = await addFichesSolutionsToEstimation(estimationId, fichesSolutions);
    await createAnalytic({
      context: { action: UPDATE_PROJET_CONTEXT_ACTIONS.UPDATE_ESTIMATION },
      event_type: EventType.UPDATE_PROJET,
      reference_id: estimation.projet_id.toString(),
      reference_type: ReferenceType.PROJET,
      user_id: session.user.id,
    });
    return { type: "success", message: "ESTIMATION_FICHES_SOLUTIONS_ADDED", estimation };
  } catch (e) {
    customCaptureException("Error in addFichesSolutionsToEstimationAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
