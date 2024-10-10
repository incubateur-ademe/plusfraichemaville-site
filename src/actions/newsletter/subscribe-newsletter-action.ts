"use server";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { NewsletterFormData, NewsletterFormSchema } from "@/src/forms/newsletter/newsletter-form-schema";

export const subscribeNewsletterAction = async (data: NewsletterFormData): Promise<ResponseAction> => {
  const parseParamResult = NewsletterFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("subscribeNewsletterAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      return { type: "success" };
    } catch (e) {
      customCaptureException("Error in subscribeNewsletterAction", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
