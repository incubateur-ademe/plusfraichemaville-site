"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { getEstimationById, updateEstimationMateriaux } from "@/lib/prisma/prismaEstimationQueries";
import { estimation } from "@prisma/client";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/forms/estimation/estimation-materiau-form-schema";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";

export const updateEstimationMateriauxAction = async (
  estimationId: number,
  data: EstimationMateriauxFormData,
): Promise<ResponseAction<{ updatedEstimation?: estimation }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const estimation = await getEstimationById(estimationId);
  if (!estimation || !(await hasPermissionToUpdateProjet(estimation.projet_id, session.user.id))) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  const parseParamResult = EstimationMateriauxFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("UpdateEstimationMateriauxAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const currentMateriauxEstimation = (estimation.materiaux as EstimationMateriauxFicheSolution[]) || [];
      const newMateriauxEstimation: EstimationMateriauxFicheSolution = {
        ficheSolutionId: data.ficheSolutionId,
        estimationMateriaux: data.estimationMateriaux,
        coutMinInvestissement: data.globalPrice?.fourniture?.min || 0,
        coutMaxInvestissement: data.globalPrice?.fourniture?.max || 0,
        coutMinEntretien: data.globalPrice?.entretien?.min || 0,
        coutMaxEntretien: data.globalPrice?.entretien?.max || 0,
      };
      const index = currentMateriauxEstimation?.findIndex((e) => e.ficheSolutionId === data.ficheSolutionId);
      if (index === -1) {
        currentMateriauxEstimation.push(newMateriauxEstimation);
      } else {
        currentMateriauxEstimation[index] = newMateriauxEstimation;
      }
      const updatedEstimation = await updateEstimationMateriaux(estimationId, currentMateriauxEstimation);
      return { type: "success", updatedEstimation };
    } catch (e) {
      customCaptureException("Error in UpdateEstimationMateriauxAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
