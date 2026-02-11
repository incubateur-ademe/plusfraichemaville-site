"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EstimationFormData, EstimationFormSchema } from "@/src/forms/estimation/EstimationFormSchema";
import { addFichesSolutionsToEstimation } from "@/src/lib/prisma/prismaEstimationQueries";
import { EstimationWithAidesDto } from "@/src/types/dto";
import { getFicheSolutionByIdsComplete } from "@/src/lib/strapi/queries/fichesSolutionsQueries";

export const addFichesSolutionsToEstimationAction = async (
  estimationId: number,
  data: EstimationFormData,
): Promise<ResponseAction<{ estimation?: EstimationWithAidesDto }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const parseParamResult = EstimationFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("addFichesSolutionsToEstimationAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  }

  const fichesSolutions = await getFicheSolutionByIdsComplete(data.ficheSolutionIds.map(Number));

  try {
    const estimation = await addFichesSolutionsToEstimation(estimationId, fichesSolutions);
    return { type: "success", message: "ESTIMATION_FICHES_SOLUTIONS_ADDED", estimation };
  } catch (e) {
    customCaptureException("Error in addFichesSolutionsToEstimationAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
