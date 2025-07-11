"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { EmailService } from "@/src/services/brevo";
import { getUserProjetById } from "@/src/lib/prisma/prisma-user-projet-queries";
import { getLastEmailForUserProjet } from "@/src/lib/prisma/prisma-email-queries";
import { emailType } from "@/src/generated/prisma/client";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";

const RESEND_DELAY_MINUTES = 10;

export const resendInvitationAction = async (userProjetId: number): Promise<ResponseAction> => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  try {
    const currentUser = await getUserWithCollectivites(session.user.id);
    const userProjet = await getUserProjetById(userProjetId);
    if (!userProjet || !currentUser) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    const canShareProjet = await new PermissionManager(session).canShareProject(userProjet.projet_id);

    if (!canShareProjet) {
      return { type: "error", message: "UNAUTHORIZED" };
    }

    const lastInvitationEmail = await getLastEmailForUserProjet(userProjet.id, emailType.projetInvitation);

    const timeSinceLastEmail = lastInvitationEmail
      ? (new Date().getTime() - lastInvitationEmail.sending_time.getTime()) / 60000
      : Infinity;

    if (timeSinceLastEmail < RESEND_DELAY_MINUTES) {
      return { type: "error", message: "INVITATION_RESEND_DELAY_TOO_SHORT" };
    }

    const emailToSend = userProjet.user?.email || userProjet.email_address;

    if (emailToSend) {
      const sent = await new EmailService().sendInvitationEmail(emailToSend, userProjet, currentUser);
      return { type: sent.type, message: sent.message };
    } else {
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  } catch (e) {
    customCaptureException("Error in resending mail DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
