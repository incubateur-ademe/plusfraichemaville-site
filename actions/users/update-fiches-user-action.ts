"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { updateFichesUser } from "@/lib/prisma/prismaUserQueries";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { UserInfos } from "@/stores/user/store";

export const updateFichesUserAction = async (
  userId: string,
  ficheId: number,
  type: "solution" | "diagnostic",
  projectName?: string,
): Promise<ResponseAction<{ user: UserInfos | null }>> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", user: null };
  }

  if (!hasPermissionToUpdateUser(userId, session.user.id)) {
    return { type: "error", message: "UNAUTHORIZED", user: null };
  }

  try {
    const user = await updateFichesUser(ficheId, session.user.id, type, projectName);

    return {
      type: "success",
      message: type === "solution" ? "BOOKMARKED_SAVED_IN_DB" : "BOOKMARKED_DIAG_SAVED_IN_DB",
      user,
    };
  } catch (e) {
    customCaptureException("Error in updateFichesUser DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", user: null };
  }
};
