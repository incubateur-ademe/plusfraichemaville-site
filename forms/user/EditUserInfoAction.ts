"use server";

import { UserInfoFormData, UserInfoFormSchema } from "@/forms/user/UserInfoFormSchema";
import { auth } from "@/lib/next-auth/auth";
import { hasPermissionToUpdateUser } from "@/forms/permission/userInfoPermission";
import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { createOrUpdateCollectivite } from "@/lib/prisma/prismaCollectiviteQueries";
import { getUserWithCollectivites, updateUser } from "@/lib/prisma/prismaUserQueries";

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
    if (prismaUser?.collectivites[0] && prismaUser?.collectivites[0].collectivite.siret !== data.siret) {
      return { success: false, error: "Vous n'avez pas la possibilité de changer de collectivité" };
    }
    const collectivite = await createOrUpdateCollectivite(
      data.siret,
      data.collectivite,
      data.codePostal,
      session.user.id,
    );
    const updatedUser = await updateUser({
      userId: data.userId,
      userPrenom: data.prenom,
      userNom: data.nom,
      userPoste: data.poste,
      collectiviteId: collectivite.id,
    });

    return { success: true, data: updatedUser };
  }
}
