"use server";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { NewsletterFormData, NewsletterFormSchema } from "@/src/forms/newsletter/newsletter-form-schema";
import { brevoAddContact } from "@/src/services/brevo/brevo-api";

export const subscribeNewsletterAction = async (data: NewsletterFormData): Promise<ResponseAction> => {
  const parseParamResult = NewsletterFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("subscribeNewsletterAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const response = await brevoAddContact({
        email: data.email,
        nomCollectivite: data.collectivite?.nomCollectivite,
        subscribeNewsletter: true,
      });
      if (!response.ok) {
        const brevoResponse = await response.json();
        captureError("Erreur avec lors de l'inscription à la lettre d’information", JSON.stringify(brevoResponse));
        if (brevoResponse.code === "duplicate_parameter") {
          return { type: "error", message: "ALREADY_SUBSCRIBED_NEWSLETTER" };
        }
        return { type: "error", message: "TECHNICAL_ERROR" };
      }
      return { type: "success", message: "NEWSLETTER_SUCCESS" };
    } catch (e) {
      customCaptureException("Error in subscribeNewsletterAction", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
