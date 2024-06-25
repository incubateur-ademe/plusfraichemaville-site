"use server";
import { fetchAideFromAidesTerritoiresById } from "@/lib/aidesTerritoires/fetch";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { addAideInEstimation, getEstimationById } from "@/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { AidesTerritoiresAideBaseData } from "@/components/financement/types";

import { upsertAide } from "@/lib/prisma/prismaAideQueries";
import { resolveAidType } from "@/components/financement/helpers";
import { EstimationAide } from "@/lib/prisma/prismaCustomTypes";

export const addAideInEstimationAction = async (
  estimationId: number,
  aideTerritoireId: number,
): Promise<ResponseAction<{ estimationAide?: EstimationAide }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const aideTerritoire = await fetchAideFromAidesTerritoiresById(aideTerritoireId);

  if (!aideTerritoire) {
    return { type: "error", message: "TECHNICAL_ERROR" };
  }

  const aideBaseData: AidesTerritoiresAideBaseData = {
    aideTerritoireId: aideTerritoire.id,
    name: aideTerritoire.name,
    financers: aideTerritoire.financers,
    submission_deadline: aideTerritoire.submission_deadline,
    type: resolveAidType(aideTerritoire.aid_types_full),
    userId: session.user.id,
  };

  const upsertedAide = await upsertAide(aideBaseData);

  const estimation = await getEstimationById(estimationId);

  if (!estimation) {
    return { type: "error", message: "ESTIMATION_DOESNT_EXIST" };
  }

  if (!(await hasPermissionToUpdateProjet(estimation.projet_id, session.user.id))) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const estimationAide = await addAideInEstimation(estimationId, upsertedAide.id);

    if (estimationAide) {
      return { type: "success", message: "ESTIMATION_UPDATED", estimationAide };
    }
    return { type: "error", message: "TECHNICAL_ERROR", estimationAide };
  } catch (e) {
    customCaptureException("Error in updateAideInEstimation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
