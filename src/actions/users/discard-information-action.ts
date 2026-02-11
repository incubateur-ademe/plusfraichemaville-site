"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";

import { getUserById, updateUserDiscardedInformation } from "@/src/lib/prisma/prismaUserQueries";
import { UserDto } from "@/src/types/dto";

export const discardInformationAction = async (
  userId: string,
  modalId: string,
): Promise<ResponseAction<{ updatedUser?: UserDto | null }>> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = new PermissionManager(session).canUpdateUser(userId);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    const updatedModalIds = user.discardedInformation || [];

    if (updatedModalIds.includes(modalId)) {
      return { type: "success", updatedUser: user };
    }
    updatedModalIds.push(modalId);
    const updatedUser = await updateUserDiscardedInformation(userId, updatedModalIds);
    return { type: "success", updatedUser: updatedUser };
  } catch (e) {
    customCaptureException("Error in accepting invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
