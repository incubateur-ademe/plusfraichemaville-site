"use server";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { createHubspotTicket } from "@/src/services/hubspot";
import { ContactFormData, ContactFormSchema } from "@/src/forms/contact/contact-form-schema";
import { EmailService } from "@/src/services/brevo";
import { brevoAddContact } from "@/src/services/brevo/brevo-api";
import { sendMattermostWebhook } from "@/src/services/mattermost";
import { makeHubspotMattermostWebhookData } from "@/src/services/mattermost/mattermost-helpers";

export const sendContactMessageAction = async (data: ContactFormData): Promise<ResponseAction> => {
  const parseParamResult = ContactFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("sendContactMessageAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const ticket = await createHubspotTicket(data);
      await sendMattermostWebhook(makeHubspotMattermostWebhookData(ticket), "hubspot");

      if (data.subscribeToNewsletter) {
        const response = await brevoAddContact({
          email: data.email,
          nomCollectivite: data.collectivite?.nomCollectivite,
          nom: data.nom,
          prenom: data.prenom,
          subscribeNewsletter: true,
        });
        if (!response.ok) {
          const brevoResponse = await response.json();
          captureError(
            "Erreur avec lors de l'inscription à la lettre d’information lors de l'envoi d'un message",
            JSON.stringify(brevoResponse),
          );
        }
      }

      const emailService = new EmailService();
      await emailService.sendContactMessageReceivedEmail(data);
      return { type: "success" };
    } catch (e) {
      customCaptureException("Error in sendContactMessageAction", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
