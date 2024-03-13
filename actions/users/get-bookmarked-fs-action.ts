"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { getBookmarkedFichesSolutions } from "@/lib/prisma/prismaUserQueries";
import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";

export const getBookmarkedFichesSolutionsAction = async (
  userId: string,
): Promise<ResponseAction<{ savedBookmarkedFichesSolutions?: ProjectBookmarks[] }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  if (!hasPermissionToUpdateUser(userId, session.user.id)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  const savedBookmarkedFichesSolutions = await getBookmarkedFichesSolutions(userId);

  return { savedBookmarkedFichesSolutions };
};
