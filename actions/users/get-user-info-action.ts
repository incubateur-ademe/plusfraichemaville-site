"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/helpers/permission-manager";

export const getUserInfoAction = async (
  userId: string,
): Promise<ResponseAction<{ userInfos?: UserWithCollectivite | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  if (!new PermissionManager().canUpdateUser(userId, session.user.id)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  const userInfos = await getUserWithCollectivites(userId);

  return { userInfos };
};
