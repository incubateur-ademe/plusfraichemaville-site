"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { updateFichesUser } from "@/src/lib/prisma/prismaUserQueries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { UserInfos } from "@/src/stores/user/store";
import { PermissionManager } from "@/src/helpers/permission-manager";

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

  const permission = new PermissionManager(session);

  if (!permission.canUpdateUser(userId)) {
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
