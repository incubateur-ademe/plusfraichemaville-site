"use server";

import { EmailService } from "@/services/brevo";
import { ResponseAction } from "../actions-types";
import { email } from "@prisma/client";

export const sendInvitationAction = async (
  emailUser: string,
  projectName: string,
): Promise<ResponseAction<{ mail?: email }>> => {
  try {
    const emailService = new EmailService();
    const invitationLink = `https://votreapp.com/invitation/${encodeURIComponent(emailUser)}`;

    const mail = await emailService.sendInvitationEmail(emailUser, projectName, invitationLink);

    return { type: "success", message: "EMAIL_SENT", mail };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'invitation:", error);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
