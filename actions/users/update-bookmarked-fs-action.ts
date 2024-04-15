"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { updateBookmarkedFichesSolutions } from "@/lib/prisma/prismaUserQueries";

import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { FichesBookmarked } from "@/components/common/generic-save-fiche/helpers";
import { UserInfos } from "@/stores/user/store";

export const updateBookmarkedFichesSolutionsProjetAction = async (
  userId: string,
  savedFichesSolutionsIds: FichesBookmarked[],
): Promise<ResponseAction<{ user: UserInfos | null }>> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", user: null };
  }

  if (!hasPermissionToUpdateUser(userId, session.user.id)) {
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
