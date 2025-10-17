import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

const webhooks = {
  batch: process.env.MATTERMOST_WEBHOOK_BATCH_URL,
} as const;

const WEBHOOK_TIMEOUT_DURATION = 3000;

export const sendMattermostWebhook = async <T>(
  data: T,
  webhookKey: keyof typeof webhooks,
  timeoutDuration: number = WEBHOOK_TIMEOUT_DURATION,
) => {
  const webhook = webhooks[webhookKey];

  if (webhook) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutDuration);
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
  }
};
