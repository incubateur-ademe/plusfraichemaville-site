"use server";

import { auth } from "@/lib/next-auth/auth";
import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/forms/projet/ProjetInfoFormSchema";
import { hasPermissionToUpdateProjet } from "@/forms/permission/projetInfoPermission";
import { createOrUpdateProjet } from "@/lib/prisma/prismaProjetQueries";
import { captureException } from "@sentry/core";

export async function editProjetInfoAction(data: ProjetInfoFormData) {
  const session = await auth();
  if (!session) {
    return { success: false, error: "Vous devez être authentifié pour faire cette requête" };
  }
  const user = await getUserWithCollectivites(session?.user.id);
  if (!user || !user.collectivites[0]) {
    return { success: false, error: "Erreur d'authentification" };
  }

  if (data.projetId && !(await hasPermissionToUpdateProjet(data.projetId, session.user.id))) {
    return { success: false, error: "Vous n'avez pas les droits de modification sur ce projet" };
  }

  const parseParamResult = ProjetInfoFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("EditProjetInfoAction format errors", parseParamResult.error.flatten());
    return { success: false, error: "Erreur de validation des données envoyées" };
  } else {
    try {
      const updatedProjet = await createOrUpdateProjet({
        projetId: data.projetId,
        nomProjet: data.nom,
        typeEspace: data.typeEspace,
        adresse: data.adresse || undefined,
        dateEcheance: data.dateEcheance,
        collectiviteId: user.collectivites[0].collectivite_id,
        userId: user.id,
      });
      return { success: true, data: updatedProjet };
    } catch (e) {
      console.log("Error in EditProjetInfoAction DB call", e);
      captureException(e);
      return { success: false, error: "Erreur technique, veuillez réessayer ultérieurement" };
    }
  }
}
