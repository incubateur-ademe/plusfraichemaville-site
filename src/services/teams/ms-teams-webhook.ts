import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { buildAdaptiveCardMessage } from "@/src/services/teams/ms-teams-helpers";

const WEBHOOK_TIMEOUT_DURATION = 5000;

export const sendMSTeamsWebhook = async (data: string, timeoutDuration: number = WEBHOOK_TIMEOUT_DURATION) => {
  const webhook = process.env.MS_TEAMS_WEBHOOK_URL;

  if (webhook) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutDuration);
    try {
      await fetch(webhook, {
        method: "POST",
        body: JSON.stringify(buildAdaptiveCardMessage(data)),
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });
    } catch (error) {
      customCaptureException(`Error in Teams WebHook webhook`, error);
    } finally {
      clearTimeout(timeout);
    }
  }
};
