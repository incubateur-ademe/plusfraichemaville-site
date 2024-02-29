"use server";

import { auth } from "@/lib/next-auth/auth";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { ResponseAction } from "../actions-types";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/forms/projet/ProjetInfoFormSchema";
import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { fetchCollectiviteFromBanApi } from "@/lib/adresseApi/fetchCollectivite";
import { createCollectiviteByName, getOrCreateCollectivite } from "@/lib/prisma/prismaCollectiviteQueries";
import { createOrUpdateProjet } from "@/lib/prisma/prismaProjetQueries";
import { captureException } from "@sentry/core";
import { ProjetWithNomCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";

export const upsertProjetAction = async (
  data: ProjetInfoFormData,
): Promise<ResponseAction<{ updatedProjet?: ProjetWithNomCollectivite }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const user = await getUserWithCollectivites(session?.user.id);
  if (!user || !user.collectivites[0]) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (data.projetId && !(await hasPermissionToUpdateProjet(data.projetId, session.user.id))) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  const parseParamResult = ProjetInfoFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("EditProjetInfoAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const entitiesFromBan = await fetchCollectiviteFromBanApi(data.collectivite.codeInsee, 50);
      let collectiviteToUse = entitiesFromBan.find((address) => address.banId === data.collectivite.banId);
      const collectivite = collectiviteToUse
        ? await getOrCreateCollectivite(collectiviteToUse, session.user.id)
        : await createCollectiviteByName(data.collectivite.nomCollectivite, session.user.id);
      const updatedProjet = await createOrUpdateProjet({
        projetId: data.projetId,
        nomProjet: data.nom,
        typeEspace: data.typeEspace,
        adresse: data.adresse || undefined,
        niveauMaturite: data.niveauMaturite,
        dateEcheance: data.dateEcheance,
        collectiviteId: collectivite.id,
        userId: user.id,
      });
      return { type: "success", message: "PROJET_UPSERTED", updatedProjet };
    } catch (e) {
      console.log("Error in EditProjetInfoAction DB call", e);
      captureException(e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
