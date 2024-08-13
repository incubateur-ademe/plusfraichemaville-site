"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/helpers/permission-manager";
import { deleteUserFromProject } from "@/lib/prisma/prisma-user-projet-queries";
import { getProjetWithRelationsById } from "@/lib/prisma/prismaProjetQueries";

export const deleteUserFromProjetAction = async (
  userId: string,
  projectId: number,
): Promise<
  ResponseAction<{
    updatedProjet?: ProjetWithRelations | null;
  }>
> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", updatedProjet: null };
  }
  const canUpdateUserRole = await new PermissionManager().canUpdateUserRole(session?.user.id, userId, projectId);

  if (!canUpdateUserRole) {
    return { type: "error", message: "UNAUTHORIZED", updatedProjet: null };
  }

  try {
    await deleteUserFromProject(userId, projectId, session.user.id);
    const updatedProjet = await getProjetWithRelationsById(projectId);
    return { type: "success", message: "USER_DELETED_FROM_PROJECT", updatedProjet: updatedProjet };
  } catch (e) {
    customCaptureException("Error in updating user role DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", updatedProjet: null };
  }
};
