"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const getUserInfoAction = async (
  userId: string,
): Promise<ResponseAction<{ userInfos?: UserWithCollectivite | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const permission = new PermissionManager(session);

  if (!permission.canUpdateUser(userId)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  const userInfos = await getUserWithCollectivites(userId);

  return { userInfos };
};
