"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/services/brevo";
import { getUserById } from "@/lib/prisma/prismaUserQueries";
import { getOrCreateProjectJoinRequest, getUserProjet } from "@/lib/prisma/prisma-user-projet-queries";
import { InvitationStatus } from "@prisma/client";

export const requestToJoinProjectAction = async (userId: string, projectId: number): Promise<ResponseAction> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = new PermissionManager().canUpdateUser(userId, session.user.id);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }
  const user = await getUserById(userId);
  if (!user) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const ecistingProjetLink = await getUserProjet(userId, projectId);
    if (ecistingProjetLink) {
      if (ecistingProjetLink.invitation_status === InvitationStatus.ACCEPTED) {
        return { type: "error", message: "REQUEST_ALREADY_IN_PROJET" };
      } else if (ecistingProjetLink.invitation_status === InvitationStatus.INVITED) {
        return { type: "error", message: "REQUEST_ALREADY_INVITED" };
      } else if (ecistingProjetLink.invitation_status === InvitationStatus.REQUESTED) {
        return { type: "error", message: "REQUEST_ALREADY_SENT" };
      }
    }

    const projetLink = await getOrCreateProjectJoinRequest(projectId, user);
    revalidatePath(`/espace-projet/${projectId}`);
    const emailService = new EmailService();
    await emailService.sendRequestAccessEmail(projetLink);
    return { type: "success", message: "REQUEST_SENT" };
  } catch (e) {
    customCaptureException("Error in request to join project DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
