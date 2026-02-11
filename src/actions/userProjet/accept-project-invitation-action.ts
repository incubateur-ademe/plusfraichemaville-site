"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { acceptProjectInvitation } from "@/src/lib/prisma/prisma-user-projet-queries";
import { ProjetWithRelationsDto } from "@/src/types/dto";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";

export const acceptProjectInvitationAction = async (
  userId: string,
  projectId: number,
): Promise<
  ResponseAction<{
    projet?: ProjetWithRelationsDto | null;
  }>
> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = new PermissionManager(session).canUpdateUser(userId);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    await acceptProjectInvitation(userId, projectId);
    const joinedProjet = await getProjetWithRelationsById(projectId);

    return { type: "success", message: "ACCEPT_INVITATION_PROJECT_ACCESS", projet: joinedProjet };
  } catch (e) {
    customCaptureException("Error in accepting invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
