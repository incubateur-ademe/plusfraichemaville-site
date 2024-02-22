"use server";

import { UserInfoFormData, UserInfoFormSchema } from "@/forms/user/UserInfoFormSchema";
import { auth } from "@/lib/next-auth/auth";
import { hasPermissionToUpdateUser } from "@/forms/permission/userInfoPermission";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { captureError } from "@/lib/sentry/sentryCustomMessage";

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
    const updateUser = await prismaClient.user.update({
      where: {
        id: data.userId,
      },
      data: {
        nom: data.nom,
        prenom: data.prenom,
        poste: data.poste,
      },
    });
    return { success: true, data: updateUser };
  }
}
