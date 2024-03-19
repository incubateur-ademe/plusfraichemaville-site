"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { getUserWithCollectivites, updateUser } from "@/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { UserInfoFormData, UserInfoFormSchema } from "@/forms/user/UserInfoFormSchema";
import { captureError, customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { getOrCreateCollectiviteFromForm } from "@/actions/collectivites/get-or-create-collectivite-from-form";

export const editUserInfoAction = async (
  data: UserInfoFormData & { userId: string },
): Promise<ResponseAction<{ updatedUser?: UserWithCollectivite | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  if (!hasPermissionToUpdateUser(data.userId, session.user.id)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  const parseParamResult = UserInfoFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("EditUserInfoAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const prismaUser = await getUserWithCollectivites(data.userId);
      if (
        prismaUser?.collectivites[0] &&
        prismaUser?.collectivites[0].collectivite.ban_id !== data.collectivite.banId
      ) {
        return { type: "error", message: "CHANGE_COLLECTIVITE_ERROR" };
      }
      const collectiviteId = await getOrCreateCollectiviteFromForm(data.collectivite, session.user.id);

      const updatedUser = await updateUser({
        userId: data.userId,
        userPrenom: data.prenom,
        userNom: data.nom,
        userPoste: data.poste,
        collectiviteId: collectiviteId,
      });

      revalidatePath(PFMV_ROUTES.MON_PROFIL);
      return { type: "success", message: "USER_UPDATED", updatedUser };
    } catch (e) {
      customCaptureException("Error in EditUserInfoAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
