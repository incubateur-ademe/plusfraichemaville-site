"use server";

import { EmailService } from "@/services/brevo";
import { ResponseAction } from "../actions-types";
import { email } from "@prisma/client";

export const sendInvitationAction = async (
  emailUser: string,
  projectName: string,
  invitationToken?: string | null,
  emailId?: string,
): Promise<ResponseAction<{ mail?: email }>> => {
  try {
    const emailService = new EmailService();
    const result = await emailService.sendInvitationEmail(emailUser, projectName, invitationToken, emailId);
    return { type: result.type, message: result.message, mail: result.email };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'invitation:", error);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
