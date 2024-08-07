"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";

import { discardedInformation } from "@/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";

export const discardInformationAction = async (
  userId: string,
  modalId: string,
  projectId?: number | null,
): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = await new PermissionManager().canUpdateUser(userId, session.user.id);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    await discardedInformation(userId, modalId);
    revalidatePath(`/espace-projet/${projectId}`);
    return { type: "success" };
  } catch (e) {
    customCaptureException("Error in accepting invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
