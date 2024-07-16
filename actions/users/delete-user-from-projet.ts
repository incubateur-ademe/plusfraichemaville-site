"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { deleteUserFromProject } from "@/lib/prisma/prismaUserQueries";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/helpers/permission-manager";
import { revalidatePath } from "next/cache";

export const deleteUserFromProjetAction = async (
  currentUserId: string,
  userId: string,
  projectId: number,
): Promise<ResponseAction<{ member: UserProjetWithUser | null }>> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", member: null };
  }
  const canUpdateUserRole = await new PermissionManager().canUpdateUserRole(session?.user.id, userId, projectId);

  if (!canUpdateUserRole) {
    return { type: "error", message: "UNAUTHORIZED", member: null };
  }

  try {
    const member = await deleteUserFromProject(userId, projectId, currentUserId);
    revalidatePath(`/espace-projet/${projectId}`);
    return {
      type: "success",
      message: "USER_DELETED_FROM_PROJECT",
      member,
    };
  } catch (e) {
    customCaptureException("Error in updating user role DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", member: null };
  }
};
