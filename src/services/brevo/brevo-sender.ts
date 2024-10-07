export const brevoSender = async (to: string, templateId: number, params?: Record<string, string>) => {
  return await fetch(process.env.BREVO_API_URL ?? "", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: [{ email: to }],
      templateId: templateId,
      ...(params && { params: params }),
    }),
  });
};
