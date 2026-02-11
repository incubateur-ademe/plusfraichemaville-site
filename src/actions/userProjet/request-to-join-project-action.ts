"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { EmailService } from "@/src/services/brevo";
import { getUserById } from "@/src/lib/prisma/prismaUserQueries";
import { getUserProjet, renewOrCreateProjectJoinRequest } from "@/src/lib/prisma/prisma-user-projet-queries";
import { InvitationStatus } from "@/src/generated/prisma/client";
import { ProjetWithPublicRelationsDto } from "@/src/types/dto";
import { getProjetWithPublicRelationsById } from "@/src/lib/prisma/prismaProjetQueries";

export const requestToJoinProjectAction = async (
  userId: string,
  projectId: number,
): Promise<
  ResponseAction<{
    updatedProjet?: ProjetWithPublicRelationsDto | null;
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
  const user = await getUserById(userId);
  if (!user) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const existingProjetLink = await getUserProjet(userId, projectId);
    if (existingProjetLink) {
      if (existingProjetLink.invitation_status === InvitationStatus.ACCEPTED) {
        return { type: "error", message: "REQUEST_ALREADY_IN_PROJET" };
      } else if (existingProjetLink.invitation_status === InvitationStatus.INVITED) {
        return { type: "error", message: "REQUEST_ALREADY_INVITED" };
      } else if (existingProjetLink.invitation_status === InvitationStatus.REQUESTED) {
        return { type: "error", message: "REQUEST_ALREADY_SENT" };
      }
    }

    const projetLink = await renewOrCreateProjectJoinRequest(projectId, user);
    const emailService = new EmailService();
    await emailService.sendRequestAccessEmail(projetLink);
    const updatedProjet = await getProjetWithPublicRelationsById(projetLink.projet_id);
    return { type: "success", message: "REQUEST_SENT", updatedProjet: updatedProjet };
  } catch (e) {
    customCaptureException("Error in request to join project DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
