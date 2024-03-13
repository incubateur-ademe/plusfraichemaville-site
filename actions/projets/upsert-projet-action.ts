"use server";

import { auth } from "@/lib/next-auth/auth";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { ResponseAction } from "../actions-types";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/forms/projet/ProjetInfoFormSchema";
import { captureError, customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { createOrUpdateProjet } from "@/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { getOrCreateCollectiviteFromForm } from "@/actions/collectivites/get-or-create-collectivite-from-form";

export const upsertProjetAction = async (
  data: ProjetInfoFormData,
): Promise<ResponseAction<{ updatedProjet?: ProjetWithRelations }>> => {
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
      const collectiviteId = await getOrCreateCollectiviteFromForm(data.collectivite, session.user.id);
      const updatedProjet = await createOrUpdateProjet({
        projetId: data.projetId,
        nomProjet: data.nom,
        typeEspace: data.typeEspace,
        adresse: data.adresse || undefined,
        niveauMaturite: data.niveauMaturite,
        dateEcheance: data.dateEcheance,
        collectiviteId: collectiviteId,
        userId: user.id,
      });
      return { type: "success", message: "PROJET_UPSERTED", updatedProjet };
    } catch (e) {
      customCaptureException("Error in EditProjetInfoAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
