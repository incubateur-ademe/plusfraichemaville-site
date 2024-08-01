"use server";
import { fetchAideFromAidesTerritoiresById } from "@/lib/aidesTerritoires/fetch";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { addAideInEstimation, getEstimationById } from "@/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";

import { upsertAide } from "@/lib/prisma/prismaAideQueries";
import { resolveAidType } from "@/components/financement/helpers";
import { EstimationAide } from "@/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/helpers/permission-manager";

export const addAideInEstimationAction = async (
  estimationId: number,
  aideTerritoireId: number,
  projetId?: number,
): Promise<ResponseAction<{ estimationAide?: EstimationAide }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (!projetId) {
    return { type: "error", message: "TECHNICAL_ERROR" };
  }

  const canUpdateProjet = await new PermissionManager().canEditProject(session.user.id, projetId);
  if (!canUpdateProjet) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
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

    if (!(await hasPermissionToUpdateProjet(estimation.projet_id, session.user.id))) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    const estimationAide = await addAideInEstimation(estimationId, upsertedAide.id);
    return { type: "success", message: "ESTIMATION_AIDE_ADDED", estimationAide };
  } catch (e) {
    customCaptureException("Error in updateAideInEstimation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
