"use server";

import { auth } from "@/lib/next-auth/auth";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { ResponseAction } from "../actions-types";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/forms/projet/ProjetInfoFormSchema";
import { captureError, customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { createOrUpdateProjet } from "@/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { getOrCreateCollectiviteFromForm } from "@/actions/collectivites/get-or-create-collectivite-from-form";
import { PermissionManager } from "@/helpers/permission-manager";

export const upsertProjetAction = async (
  data: ProjetInfoFormData,
): Promise<ResponseAction<{ updatedProjet?: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const user = await getUserWithCollectivites(session?.user.id);

  if (!user || !user.collectivites[0]) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (data.projetId && !(await new PermissionManager().canEditProject(session.user.id, data.projetId))) {
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
        adresse: data.adresse?.label || undefined,
        adresse_info: data.adresse?.banInfo || undefined,
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
