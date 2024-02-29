"use server";

import { UserInfoFormData, UserInfoFormSchema } from "@/forms/user/UserInfoFormSchema";
import { auth } from "@/lib/next-auth/auth";

import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { createCollectiviteByName, getOrCreateCollectivite } from "@/lib/prisma/prismaCollectiviteQueries";
import { getUserWithCollectivites, updateUser } from "@/lib/prisma/prismaUserQueries";
import { fetchCollectiviteFromBanApi } from "@/lib/adresseApi/fetchCollectivite";
import { revalidatePath } from "next/cache";
import { PFMV_ROUTES } from "@/helpers/routes";
import { hasPermissionToUpdateUser } from "@/helpers/permissions";

export async function editUserInfoAction(data: UserInfoFormData & { userId: string }) {
  const session = await auth();
  if (!session) {
    return { success: false, error: "Erreur d'authentification" };
  }
  if (!hasPermissionToUpdateUser(data.userId, session.user.id)) {
    return { success: false, error: "Vous n'avez pas les droits de modification sur cet utilisateur" };
  }

  const parseParamResult = UserInfoFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("EditUserInfoAction format errors", parseParamResult.error.flatten());
    return { success: false, error: "Erreur de validation des données envoyées" };
  }

  if (parseParamResult.success) {
    const prismaUser = await getUserWithCollectivites(data.userId);
    if (prismaUser?.collectivites[0] && prismaUser?.collectivites[0].collectivite.ban_id !== data.collectivite.banId) {
      return { success: false, error: "Vous n'avez pas la possibilité de changer de collectivité" };
    }
    const entitiesFromBan = await fetchCollectiviteFromBanApi(data.collectivite.codeInsee, 50);
    let collectiviteToUse = entitiesFromBan.find((address) => address.banId === data.collectivite.banId);
    const collectivite = collectiviteToUse
      ? await getOrCreateCollectivite(collectiviteToUse, session.user.id)
      : await createCollectiviteByName(data.collectivite.nomCollectivite, session.user.id);
    const updatedUser = await updateUser({
      userId: data.userId,
      userPrenom: data.prenom,
      userNom: data.nom,
      userPoste: data.poste,
      collectiviteId: collectivite.id,
    });
    revalidatePath(PFMV_ROUTES.MON_PROFIL);
    return { success: true, data: updatedUser };
  }
}
