export const brevoSendEmail = async (to: string, templateId: number, params?: Record<string, string | boolean>) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    return await fetch(`${process.env.BREVO_API_BASE_URL}/smtp/email`, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [{ email: to }],
        templateId: templateId,
        ...(params && { params }),
      }),
      signal: controller.signal,
    });
  } catch (error) {
    throw new Error(`Erreur avec l'API Brevo : ${error}`);
  } finally {
    clearTimeout(timeout);
  }
};
