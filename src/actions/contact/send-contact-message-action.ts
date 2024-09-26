"use server";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { createHubspotTicket } from "@/src/services/hubspot";
import { ContactFormData, ContactFormSchema } from "@/src/forms/contact/contact-form-schema";
import { EmailService } from "@/src/services/brevo";

export const sendContactMessageAction = async (data: ContactFormData): Promise<ResponseAction> => {
  const parseParamResult = ContactFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("sendContactMessageAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      await createHubspotTicket(data);
      const emailService = new EmailService();
      await emailService.sendContactMessageReceivedEmail(data);
      return { type: "success" };
    } catch (e) {
      customCaptureException("Error in sendContactMessageAction", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
