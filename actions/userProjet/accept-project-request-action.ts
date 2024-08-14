"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { acceptProjectRequest } from "@/lib/prisma/prisma-user-projet-queries";
import { getProjetWithRelationsById } from "@/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

export const acceptProjectRequestAction = async (
  projectId: number,
  userIdToUpdate: string,
): Promise<
  ResponseAction<{
    updatedProjet?: ProjetWithRelations | null;
  }>
> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const cantEditProject = await new PermissionManager().canShareProject(session.user.id, projectId);

  if (!cantEditProject) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    await acceptProjectRequest(userIdToUpdate, projectId);
    const updatedProjet = await getProjetWithRelationsById(projectId);
    return { type: "success", message: "ACCEPT_REQUEST_PROJECT_ACCESS", updatedProjet: updatedProjet };
  } catch (e) {
    customCaptureException("Error in accepting invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
