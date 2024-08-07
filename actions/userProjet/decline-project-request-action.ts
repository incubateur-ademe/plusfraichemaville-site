"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { revalidatePath } from "next/cache";
import { declineProjectRequest } from "@/lib/prisma/prismaUserQueries";

export const declineProjectRequestAction = async (
  projectId: number,
  userIdToUpdate: string,
): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const cantEditProject = await new PermissionManager().canEditProject(session.user.id, projectId);

  if (!cantEditProject) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    await declineProjectRequest(userIdToUpdate, projectId, session.user.id);
    revalidatePath(`/espace-projet/${projectId}`);
    return { type: "success", message: "DECLINE_REQUEST_PROJECT_ACCESS" };
  } catch (e) {
    customCaptureException("Error in declining invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
