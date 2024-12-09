import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

const webhooks = {
  hubspot: process.env.MATTERMOST_WEBHOOK_HUBSPOT_URL ?? "",
} as const;

const WEBHOOK_TIMEOUT_DURATION = 3000;

export const sendMattermostWebhook = async <T>(data: T, webhookKey: keyof typeof webhooks) => {
  const webhook = webhooks[webhookKey];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_DURATION);

  try {
    await fetch(webhook, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
  } catch (error) {
    customCaptureException(`Error in following Mattermost webhook : ${webhook}`, error);
  } finally {
    clearTimeout(timeout);
  }
};
