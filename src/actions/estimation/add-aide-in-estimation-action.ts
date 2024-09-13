"use server";
import { fetchAideFromAidesTerritoiresById } from "@/src/lib/aidesTerritoires/fetch";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { addAideInEstimation, getEstimationById } from "@/src/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

import { upsertAide } from "@/src/lib/prisma/prismaAideQueries";
import { resolveAidType } from "@/src/components/financement/helpers";
import { EstimationAide } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const addAideInEstimationAction = async (
  estimationId: number,
  aideTerritoireId: number,
): Promise<ResponseAction<{ estimationAide?: EstimationAide }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  try {
    const aideTerritoire = await fetchAideFromAidesTerritoiresById(aideTerritoireId);

    if (!aideTerritoire) {
      return { type: "error", message: "TECHNICAL_ERROR" };
    }

    const aideBaseData = {
      aideTerritoireId: aideTerritoire.id,
      name: aideTerritoire.name,
      financers: aideTerritoire.financers,
      submission_deadline: aideTerritoire.submission_deadline ? new Date(aideTerritoire.submission_deadline) : null,
      type: resolveAidType(aideTerritoire.aid_types_full),
    };

    const upsertedAide = await upsertAide(aideBaseData);

    const estimation = await getEstimationById(estimationId);

    if (!estimation) {
      return { type: "error", message: "ESTIMATION_DOESNT_EXIST" };
    }
    const permission = new PermissionManager(session);
    const canUpdateProjet = permission.canEditProject(estimation.projet_id);

    if (!canUpdateProjet) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    }

    const estimationAide = await addAideInEstimation(estimationId, upsertedAide.id);
    return { type: "success", message: "ESTIMATION_AIDE_ADDED", estimationAide };
  } catch (e) {
    customCaptureException("Error in updateAideInEstimation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
