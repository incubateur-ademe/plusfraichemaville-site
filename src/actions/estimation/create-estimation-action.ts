"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EstimationFormData, EstimationFormSchema } from "@/src/forms/estimation/EstimationFormSchema";
import { createEstimation } from "@/src/lib/prisma/prismaEstimationQueries";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";

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

  const canUpdateProjet = await new PermissionManager(session).canEditProject(projetId);

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
