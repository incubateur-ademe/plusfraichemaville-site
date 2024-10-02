"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { acceptProjectRequest } from "@/src/lib/prisma/prisma-user-projet-queries";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { EmailService } from "@/src/services/brevo";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";

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
  const cantEditProject = await new PermissionManager(session).canShareProject(projectId);

  if (!cantEditProject) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const projetLink = await acceptProjectRequest(userIdToUpdate, projectId);

    const currentUser = await getUserWithCollectivites(session.user.id);
    if (projetLink && projetLink.user && currentUser) {
      const emailService = new EmailService();
      await emailService.sendResponseRequestAccessEmail(projetLink.user?.email, projetLink, currentUser, true);
    }
    const updatedProjet = await getProjetWithRelationsById(projectId);
    return { type: "success", message: "ACCEPT_REQUEST_PROJECT_ACCESS", updatedProjet: updatedProjet };
  } catch (e) {
    customCaptureException("Error in accepting invitation DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
