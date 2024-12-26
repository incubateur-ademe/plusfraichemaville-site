"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { deleteUserFromProject } from "@/src/lib/prisma/prisma-user-projet-queries";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";

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
  const canUpdateUserRole = await new PermissionManager(session).canModifiyUserRole(userId, projectId);

  if (!canUpdateUserRole) {
    return { type: "error", message: "UNAUTHORIZED", updatedProjet: null };
  }

  try {
    await deleteUserFromProject(userId, projectId, session.user.id);
    const updatedProjet = await getProjetWithRelationsById(projectId);

    return { type: "success", message: "USER_DELETED_FROM_PROJECT", updatedProjet };
  } catch (e) {
    customCaptureException("Error in updating user role DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", updatedProjet: null };
  }
};
