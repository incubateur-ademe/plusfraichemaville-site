"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";
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

  revalidatePath(PFMV_ROUTES.MON_PROFIL);
  return { type: "success", message: "USER_UPDATED", savedBookmarkedFichesSolutions };
};
