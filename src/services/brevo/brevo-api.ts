export const brevoSendEmail = async (to: string, templateId: number, params?: Record<string, string>) => {
  return await fetch(`${process.env.BREVO_API_BASE_URL}/smtp/email`, {
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

export const brevoAddContact = async (email: string, nomCollectivite?: string, nom?: string, prenom?: string) => {
  return await fetch(`${process.env.BREVO_API_BASE_URL}/contacts`, {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      attributes: {
        ...(nomCollectivite && {
          NOMCOLLECTIVITE: nomCollectivite,
          TYPE: 1,
        }),
        NOM: nom,
        PRENOM: prenom,
      },
    }),
  });
};
