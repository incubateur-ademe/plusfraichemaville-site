import * as Sentry from "@sentry/nextjs";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { IApiSirenQueryTypes } from "@/src/lib/siren/types";

const SIREN_API_URL = "https://api.insee.fr/api-sirene/3.11";

export const fetchEntrepriseFromSirenApi = async (siret: string) => {
  try {
    const response = await fetch(`${SIREN_API_URL}/siret/${siret}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-INSEE-Api-Key-Integration": process.env.INSEE_API_KEY ?? "",
      },
    });

    const result = (await response.json()) as IApiSirenQueryTypes;

    if (response.status >= 400 || result.fault) {
      captureError("Error when fetching SIREN API Info", result.fault);
      return null;
    }
    return result;
  } catch (e: any) {
    Sentry.captureException("Exception when fetching SIREN API info", e);
    return null;
  }
};
