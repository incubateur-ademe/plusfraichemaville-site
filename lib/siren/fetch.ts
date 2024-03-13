import * as Sentry from "@sentry/nextjs";
import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { IApiSirenQueryToken, IApiSirenQueryTypes } from "@/lib/siren/types";

const TOKEN_VALIDITY_IN_SECONDS = 86400;

const tokenFetch = async (): Promise<IApiSirenQueryToken | null> => {
  try {
    const auth = Buffer.from(`${process.env.SIREN_API_KEY}:${process.env.SIREN_API_SECRET}`).toString("base64");

    const response = await fetch(`https://api.insee.fr/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: TOKEN_VALIDITY_IN_SECONDS, tags: ["siren"] },
    });

    const result = (await response.json()) as IApiSirenQueryToken;

    if (response.status >= 400 || result.error) {
      captureError("Error when fetching SIREN API Token", result.error);
      return null;
    }

    return result;
  } catch (e: any) {
    Sentry.captureException("Error when fetching SIREN API info", e);
    return null;
  }
};

export const fetchEntrepriseFromSirenApi = async (siret: string) => {
  const token = await tokenFetch();
  try {
    const response = await fetch(
      `https://api.insee.fr/entreprises/sirene/V3/siret/${siret}?` +
        `champs=codePostalEtablissement,codeCommuneEtablissement`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token?.access_token}`,
        },
      },
    );

    const result = (await response.json()) as IApiSirenQueryTypes;

    if (response.status >= 400 || result.fault) {
      captureError("Error when fetching SIREN API Info", result.error);
      return null;
    }
    return result;
  } catch (e: any) {
    Sentry.captureException("Error when fetching SIREN API info", e);
    return null;
  }
};
