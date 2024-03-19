"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { updateBookmarkedFichesSolutions } from "@/lib/prisma/prismaUserQueries";

import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";

export const updateBookmarkedFichesSolutionsProjetAction = async (
  userId: string,
  savedFichesSolutionsIds: ProjectBookmarks[],
): Promise<ResponseAction<{ updatedBookmarkedFichesSolutions: ProjectBookmarks[] | null }>> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", updatedBookmarkedFichesSolutions: null };
  }

  if (!hasPermissionToUpdateUser(session.user.id, userId)) {
    return { type: "error", message: "UNAUTHORIZED", updatedBookmarkedFichesSolutions: null };
  }

  try {
    const updatedBookmarkedFichesSolutions = await updateBookmarkedFichesSolutions(
      session.user.id,
      savedFichesSolutionsIds,
    );

    return { type: "success", message: "BOOKMARKED_SAVED_IN_DB", updatedBookmarkedFichesSolutions };
  } catch (e) {
    customCaptureException("Error in UpdateBookmarkedFichesSolutionsProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", updatedBookmarkedFichesSolutions: null };
  }
};
