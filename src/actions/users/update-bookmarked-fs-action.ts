"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateBookmarkedFichesSolutions } from "@/src/lib/prisma/prismaUserQueries";

import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { FichesBookmarked } from "@/src/components/common/generic-save-fiche/helpers";
import { UserInfos } from "@/src/stores/user/store";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const updateBookmarkedFichesSolutionsProjetAction = async (
  userId: string,
  savedFichesSolutionsIds: FichesBookmarked[],
): Promise<ResponseAction<{ user: UserInfos | null }>> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", user: null };
  }
  const permission = new PermissionManager(session);

  if (!permission.canUpdateUser(userId)) {
    return { type: "error", message: "UNAUTHORIZED", user: null };
  }

  try {
    const user = await updateBookmarkedFichesSolutions(session.user.id, savedFichesSolutionsIds);

    return { type: "success", message: "BOOKMARKED_SAVED_IN_DB", user };
  } catch (e) {
    customCaptureException("Error in UpdateBookmarkedFichesSolutionsProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", user: null };
  }
};
