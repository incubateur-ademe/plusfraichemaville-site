"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { RoleProjet } from "@/src/generated/prisma/client";
import { ProjetWithRelationsDto } from "@/src/types/dto";
import { updateUserRoleProject } from "@/src/lib/prisma/prisma-user-projet-queries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const updateUserRoleProjectAction = async (
  userId: string,
  projectId: number,
  role: RoleProjet,
): Promise<ResponseAction<{ projet: ProjetWithRelationsDto | null }>> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }

  const canUpdateUserRole = await new PermissionManager(session).canModifiyUserRole(userId, projectId);

  if (!canUpdateUserRole) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  if (role === RoleProjet.ADMIN) {
    return { type: "error", message: "ADMIN_ROLE_NOT_ALLOWED", projet: null };
  }

  try {
    const projet = await updateUserRoleProject(userId, projectId, role);

    return {
      type: "success",
      message: "ROLE_UPDATED",
      projet,
    };
  } catch (e) {
    customCaptureException("Error in updating user role DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", projet: null };
  }
};
