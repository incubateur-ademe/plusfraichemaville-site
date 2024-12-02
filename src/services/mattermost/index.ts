const webhooks = {
  hubspot: process.env.MATTERMOST_WEBHOOK_HUBSPOT_URL ?? "",
} as const;

export const sendMattermostWebhook = async <T>(data: T, webhook: keyof typeof webhooks) => {
  await fetch(webhooks[webhook], {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
