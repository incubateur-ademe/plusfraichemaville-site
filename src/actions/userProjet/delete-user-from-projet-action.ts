"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { deleteUserFromProject } from "@/src/lib/prisma/prisma-user-projet-queries";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";

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
  const canUpdateUserRole = await new PermissionManager(session).canUpdateUserRole(userId, projectId);

  if (!canUpdateUserRole) {
    return { type: "error", message: "UNAUTHORIZED", updatedProjet: null };
  }

  try {
    await deleteUserFromProject(userId, projectId, session.user.id);
    const updatedProjet = await getProjetWithRelationsById(projectId);
    if (updatedProjet) {
      await createAnalytic({
        context: {
          deletedUser: userId,
        },
        event_type: "DELETE_USER_FROM_PROJET",
        reference_id: updatedProjet?.id,
        reference_type: "USER",
        userId: session.user.id,
      });
    }
    return { type: "success", message: "USER_DELETED_FROM_PROJECT", updatedProjet: updatedProjet };
  } catch (e) {
    customCaptureException("Error in updating user role DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", updatedProjet: null };
  }
};
