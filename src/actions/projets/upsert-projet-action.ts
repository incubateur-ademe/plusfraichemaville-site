"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { ResponseAction } from "../actions-types";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/src/forms/projet/ProjetInfoFormSchema";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { createOrUpdateProjet, getProjetById } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { getOrCreateCollectiviteFromForm } from "@/src/actions/collectivites/get-or-create-collectivite-from-form";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";

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
  const permission = new PermissionManager(session);

  let projetToEdit = null;
  if (data.projetId) {
    if (!(await permission.canEditProject(data.projetId))) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    } else {
      projetToEdit = await getProjetById(data.projetId);
      if (!projetToEdit) {
        return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
      }
    }
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
        adresse_all_infos: data.adresse?.banInfo || undefined,
        niveauMaturite: data.niveauMaturite,
        dateEcheance: data.dateEcheance,
        collectiviteId: collectiviteId,
        userId: user.id,
        isPublic: data.isPublic,
      });

      if (updatedProjet && projetToEdit?.niveau_maturite !== updatedProjet.niveau_maturite) {
        await createAnalytic({
          context: {
            maturite: updatedProjet.niveau_maturite,
          },
          event_type: "UPDATE_MATURITE",
          reference_id: updatedProjet?.id,
          reference_type: "PROJET",
          user_id: session.user.id,
        });
      }

      return { type: "success", message: "PROJET_UPSERTED", updatedProjet };
    } catch (e) {
      customCaptureException("Error in EditProjetInfoAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
