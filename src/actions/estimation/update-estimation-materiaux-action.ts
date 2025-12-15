"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

import { getEstimationById, updateEstimationMateriaux } from "@/src/lib/prisma/prismaEstimationQueries";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/src/forms/estimation/estimation-materiau-form-schema";
import { EstimationFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import {
  EstimationMateriauxFormSimpleFieldSchema,
  EstimationMateriauxSimpleFieldFormData,
} from "@/src/forms/estimation/estimation-materiau-form-simple-field-schema";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const updateEstimationMateriauxAction = async (
  estimationId: number,
  data: EstimationMateriauxFormData | EstimationMateriauxSimpleFieldFormData,
): Promise<ResponseAction<{ updatedEstimation?: EstimationWithAides }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const estimation = await getEstimationById(estimationId);
  const permission = new PermissionManager(session);

  if (!estimation || !(await permission.canEditProject(estimation.projet_id))) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  const isMultipleFieldsFormData = "estimationMateriaux" in data;

  const parseParamResult = isMultipleFieldsFormData
    ? EstimationMateriauxFormSchema.safeParse(data)
    : EstimationMateriauxFormSimpleFieldSchema.safeParse(data);

  if (!parseParamResult.success) {
    captureError("UpdateEstimationMateriauxAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const estimationFicheSolution: EstimationFicheSolution = {
        ficheSolutionId: data.ficheSolutionId,
        estimationMateriaux: isMultipleFieldsFormData ? data.estimationMateriaux : undefined,
        coutMinInvestissement: data.globalPrice?.fourniture?.min || 0,
        coutMaxInvestissement: data.globalPrice?.fourniture?.max || 0,
        coutMinEntretien: data.globalPrice?.entretien?.min || 0,
        coutMaxEntretien: data.globalPrice?.entretien?.max || 0,
        quantite: isMultipleFieldsFormData ? undefined : data.quantite,
      };

      const updatedEstimation = await updateEstimationMateriaux(estimationId, estimationFicheSolution);
      return { type: "success", updatedEstimation };
    } catch (e) {
      customCaptureException("Error in UpdateEstimationMateriauxAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
