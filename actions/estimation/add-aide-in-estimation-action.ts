"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { addAideInEstimation, getEstimationById } from "@/lib/prisma/prismaEstimationQueries";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { AidesTerritoiresAide, AidesTerritoiresAideBaseData } from "@/components/financement/types";
import { fetchAidesFromAidesTerritoiresById } from "@/lib/aidesTerritoires/fetch";
import { upsertAide } from "@/lib/prisma/prismaAideQueries";
import { resolveAidType } from "@/components/financement/helpers";
import { estimations_aides } from "@prisma/client";

export const addAideInEstimationAction = async (
  estimationId: number,
  aideTerritoireId: number,
): Promise<ResponseAction<{ estimationAide?: estimations_aides }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const aideTerritoire = await fetchAidesFromAidesTerritoiresById(aideTerritoireId);

  const aideBaseData: AidesTerritoiresAideBaseData = {
    aideTerritoireId: aideTerritoire.id,
    name: aideTerritoire.name,
    financers: aideTerritoire.financers,
    submission_deadline: aideTerritoire.submission_deadline,
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

  try {
    const estimationAide = await addAideInEstimation(estimationId, upsertedAide.id);

    return { type: "success", message: "ESTIMATION_UPDATED", estimationAide };
  } catch (e) {
    customCaptureException("Error in updateAideInEstimation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
