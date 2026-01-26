"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

import { getEstimationById, updateEstimationMateriaux } from "@/src/lib/prisma/prismaEstimationQueries";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/src/forms/estimation/estimation-materiau-form-schema";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import {
  EstimationMateriauxFormSimpleFieldSchema,
  EstimationMateriauxSimpleFieldFormData,
} from "@/src/forms/estimation/estimation-materiau-form-simple-field-schema";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { mapEstimationMateriauFormToDb } from "@/src/lib/prisma/prismaCustomTypesHelper";

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
      const updatedEstimation = await updateEstimationMateriaux(estimationId, {
        fiche_solution_id: data.ficheSolutionId,
        quantite: isMultipleFieldsFormData ? null : data.quantite,
        cout_investissement_override: isMultipleFieldsFormData ? null : data.coutInvestissementOverride ?? null,
        cout_entretien_override: isMultipleFieldsFormData ? null : data.coutEntretienOverride ?? null,
        cout_min_investissement: data.globalPrice?.fourniture?.min || 0,
        cout_max_investissement: data.globalPrice?.fourniture?.max || 0,
        cout_min_entretien: data.globalPrice?.entretien?.min || 0,
        cout_max_entretien: data.globalPrice?.entretien?.max || 0,
        estimation_materiaux: isMultipleFieldsFormData
          ? data.estimationMateriaux.map(mapEstimationMateriauFormToDb)
          : [],
      });
      return { type: "success", updatedEstimation };
    } catch (e) {
      customCaptureException("Error in UpdateEstimationMateriauxAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
