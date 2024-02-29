"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { getUserWithCollectivites, updateUser } from "@/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { UserInfoFormData, UserInfoFormSchema } from "@/forms/user/UserInfoFormSchema";
import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { fetchCollectiviteFromBanApi } from "@/lib/adresseApi/fetchCollectivite";
import { createCollectiviteByName, getOrCreateCollectivite } from "@/lib/prisma/prismaCollectiviteQueries";

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
    const prismaUser = await getUserWithCollectivites(data.userId);
    if (prismaUser?.collectivites[0] && prismaUser?.collectivites[0].collectivite.ban_id !== data.collectivite.banId) {
      return { type: "error", message: "CHANGE_COLLECTIVITE_ERROR" };
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
    return { type: "success", message: "USER_UPDATED", updatedUser };
  }
};
