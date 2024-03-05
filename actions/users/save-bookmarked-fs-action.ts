"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { saveBookmarkedFicheSolutionsByUser } from "@/lib/prisma/prismaUserQueries";

import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";

export const saveBookmarkedFichesSolutionsProjetAction = async (
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

  const updatedBookmarkedFichesSolutions = (await saveBookmarkedFicheSolutionsByUser(
    session.user.id,
    savedFichesSolutionsIds,
  )) as ProjectBookmarks[];

  return { type: "success", message: "BOOKMARKED_SAVED_IN_DB", updatedBookmarkedFichesSolutions };
};
