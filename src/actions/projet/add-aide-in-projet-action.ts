"use server";
import { fetchAideFromAidesTerritoiresById } from "@/src/lib/aidesTerritoires/fetch";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

import { upsertAide } from "@/src/lib/prisma/prismaAideQueries";
import { resolveAidType } from "@/src/components/financement/helpers";
import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { addAideInProjet } from "@/src/lib/prisma/prisma-projet-aides-queries";

export const addAideInProjetAction = async (
  projetId: number,
  aideTerritoireId: number,
): Promise<ResponseAction<{ projetAide?: ProjetAideWithAide }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  try {
    const permission = new PermissionManager(session);

    if (!(await permission.canEditProject(projetId))) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    }

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

    const projetAide = await addAideInProjet(projetId, upsertedAide.id, session.user.id);
    return { type: "success", message: "PROJET_AIDE_ADDED", projetAide };
  } catch (e) {
    customCaptureException("Error in addAideInProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
