"use server";

import { auth } from "@/lib/next-auth/auth";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { EstimationFormData, EstimationFormSchema } from "@/forms/estimation/EstimationFormSchema";
import { createEstimation } from "@/lib/prisma/prismaEstimationQueries";
import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/helpers/permission-manager";

export const createEstimationAction = async (
  projetId: number,
  data: EstimationFormData,
): Promise<ResponseAction<{ estimation?: EstimationWithAides }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const user = await getUserWithCollectivites(session?.user.id);
  if (!user || !user.collectivites[0]) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const canUpdateProjet = await new PermissionManager().canEditProject(projetId);

  if (!canUpdateProjet) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  const parseParamResult = EstimationFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("EditProjetInfoAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const estimation = await createEstimation(projetId, data.ficheSolutionIds.map(Number), session.user.id);
      return { type: "success", message: "ESTIMATION_CREATED", estimation };
    } catch (e) {
      customCaptureException("Error in EditProjetInfoAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
