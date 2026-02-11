"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { updateUserBrowsingDate } from "@/src/lib/prisma/prismaUserQueries";
import { ResponseAction } from "../actions-types";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { UserWithCollectiviteDto } from "@/src/types/dto";

export const updateUserBrowsingDateAction = async (
  userId: string,
): Promise<ResponseAction<{ updatedUser?: UserWithCollectiviteDto | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const permission = new PermissionManager(session);
  if (!permission.canUpdateUser(userId)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const updatedUser = await updateUserBrowsingDate(userId);
    return { type: "success", message: "USER_UPDATED", updatedUser };
  } catch (e) {
    console.error("Error in updateUserBrowsingDateAction", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
