"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/lib/sentry/sentryCustomMessage";

import { getEstimationById, updateEstimationMateriaux } from "@/lib/prisma/prismaEstimationQueries";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/forms/estimation/estimation-materiau-form-schema";
import { EstimationMateriauxFicheSolution, EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import {
  EstimationMateriauxFormSimpleFieldSchema,
  EstimationMateriauxSimpleFieldFormData,
} from "@/forms/estimation/estimation-materiau-form-simple-field-schema";
import { PermissionManager } from "@/helpers/permission-manager";

export const updateEstimationMateriauxAction = async (
  estimationId: number,
  data: EstimationMateriauxFormData | EstimationMateriauxSimpleFieldFormData,
): Promise<ResponseAction<{ updatedEstimation?: EstimationWithAides }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const estimation = await getEstimationById(estimationId);
  if (!estimation) {
    return { type: "error", message: "TECHNICAL_ERROR" };
  }

  const canUpdateProjet = await new PermissionManager().canEditProject(session.user.id, estimation.projet_id);
  if (!canUpdateProjet) {
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
      const currentMateriauxEstimation = (estimation.materiaux as EstimationMateriauxFicheSolution[]) || [];
      const newMateriauxEstimation: EstimationMateriauxFicheSolution = {
        ficheSolutionId: data.ficheSolutionId,
        estimationMateriaux: isMultipleFieldsFormData ? data.estimationMateriaux : undefined,
        coutMinInvestissement: data.globalPrice?.fourniture?.min || 0,
        coutMaxInvestissement: data.globalPrice?.fourniture?.max || 0,
        coutMinEntretien: data.globalPrice?.entretien?.min || 0,
        coutMaxEntretien: data.globalPrice?.entretien?.max || 0,
        quantite: isMultipleFieldsFormData ? undefined : data.quantite,
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
