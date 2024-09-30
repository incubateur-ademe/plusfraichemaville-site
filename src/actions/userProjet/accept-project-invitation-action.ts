"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { acceptProjectInvitation } from "@/src/lib/prisma/prisma-user-projet-queries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";

export const acceptProjectInvitationAction = async (
  userId: string,
  projectId: number,
): Promise<
  ResponseAction<{
    projet?: ProjetWithRelations | null;
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
    const accepted = await acceptProjectInvitation(userId, projectId);
    const joinedProjet = await getProjetWithRelationsById(projectId);
    if (accepted) {
      await createAnalytic({
        context: {},
        event_type: "ACCEPT_INVITATION",
        reference_id: projectId,
        reference_type: "USER",
        userId: session.user.id,
      });
    }
    return { type: "success", message: "ACCEPT_INVITATION_PROJECT_ACCESS", projet: joinedProjet };
  } catch (e) {
    customCaptureException("Error in accepting invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
