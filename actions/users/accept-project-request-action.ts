"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { revalidatePath } from "next/cache";
import { acceptProjectRequest } from "@/lib/prisma/prismaUserQueries";

export const acceptProjectRequestAction = async (
  userId: string,
  projectId: number,
  userIdToUpdate: string,
): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const cantEditProject = await new PermissionManager().canEditProject(userId, projectId);

  if (!cantEditProject) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const accept = await acceptProjectRequest(userIdToUpdate, projectId);
    revalidatePath(`/espace-projet/${projectId}`);
    if (accept) {
      return {
        type: "success",
        message: "ACCEPT_INVITATION",
      };
    } else
      return {
        type: "error",
        message: "TECHNICAL_ERROR",
      };
  } catch (e) {
    customCaptureException("Error in accepting invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
