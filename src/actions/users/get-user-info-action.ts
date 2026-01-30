"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { getUserById } from "@/src/lib/prisma/prismaUserQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { User } from "@/src/generated/prisma/client";

export const getUserInfoAction = async (userId: string): Promise<ResponseAction<{ userInfos?: User | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const permission = new PermissionManager(session);

  if (!permission.canUpdateUser(userId)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  const userInfos = await getUserById(userId);

  return { userInfos };
};
