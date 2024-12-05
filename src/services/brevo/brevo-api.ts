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

type BrevoUpsertContactType = {
  email: string;
  acceptInfoProduct?: boolean;
  nomCollectivite?: string;
  nom?: string;
  prenom?: string;
};

export const brevoAddContact = async ({
  email,
  nomCollectivite,
  acceptInfoProduct,
  nom,
  prenom,
}: BrevoUpsertContactType) => {
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
        OPT_IN_INFO_PRODUIT: acceptInfoProduct,
        NOM: nom,
        PRENOM: prenom,
      },
    }),
  });
};

export const brevoUpdateContact = async ({
  email,
  nomCollectivite,
  acceptInfoProduct,
  nom,
  prenom,
}: BrevoUpsertContactType) => {
  return await fetch(`${process.env.BREVO_API_BASE_URL}/contacts/${email}`, {
    method: "PUT",
    headers: {
      "api-key": process.env.BREVO_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attributes: {
        ...(nomCollectivite && {
          NOMCOLLECTIVITE: nomCollectivite,
          TYPE: 1,
        }),
        NOM: nom,
        PRENOM: prenom,
        OPT_IN_INFO_PRODUIT: acceptInfoProduct,
      },
    }),
  });
};

export const upsertBrevoContact = async (params: BrevoUpsertContactType) => {
  const resultAdd = await brevoAddContact(params);
  if (!resultAdd.ok) {
    const brevoResponse = await resultAdd.json();
    if (brevoResponse.code === "duplicate_parameter") {
      return await brevoUpdateContact(params);
    }
  }
  return resultAdd;
};
