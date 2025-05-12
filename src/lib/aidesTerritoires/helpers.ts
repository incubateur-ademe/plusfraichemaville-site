import { IApiAidesTerritoiresQueryToken, IApiAidesTerritoiresResponse } from "@/src/lib/aidesTerritoires/types";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import * as Sentry from "@sentry/nextjs";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { customRevalidateTag } from "@/src/helpers/revalidate-tag-call";

const TOKEN_VALIDITY_IN_SECONDS = 86400;
const FETCH_TOCKEN_CACHE_TAG = "aides-territoires-token";

export const extractMotsClesFromFichesSolutions = (fichesAttributes: FicheSolution["attributes"][]) => {
  return fichesAttributes
    .map((ficheSolution) => ficheSolution.aides_territoires_mots_cles || ficheSolution.titre)
    .join(";")
    .split(";")
    .map((motCle) => `"${motCle.trim()}"`)
    .join(",");
};

export const fetchAidesTerritoiresToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${process.env.AIDES_TERRITOIRES_API_URL}/connexion/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-AUTH-TOKEN": `${process.env.AIDES_TERRITOIRES_API_KEY}`,
      },
      next: { revalidate: TOKEN_VALIDITY_IN_SECONDS, tags: [FETCH_TOCKEN_CACHE_TAG] },
    });

    const result = (await response.json()) as IApiAidesTerritoiresQueryToken;

    if (response.status >= 400) {
      captureError("Error when fetching Aides territoires API Token", result.message);
      return null;
    }
    return result.token;
  } catch (e: any) {
    Sentry.captureException("Exception when fetching Aides territoires API token", e);
    return null;
  }
};

export const callAidesTerritoiresApi = async <T extends IApiAidesTerritoiresResponse>(
  url: string,
  isSecondCall = false,
): Promise<T | null> => {
  const token = await fetchAidesTerritoiresToken();
  await customRevalidateTag(FETCH_TOCKEN_CACHE_TAG);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: TOKEN_VALIDITY_IN_SECONDS, tags: ["aides-territoires"] },
    });

    const result = (await response.json()) as T;
    if (!isSecondCall && response.status === 401) {
      await customRevalidateTag(FETCH_TOCKEN_CACHE_TAG);
      return callAidesTerritoiresApi(url, true);
    }
    if (response.status >= 400) {
      captureError(`Error when calling Aides territoires API status ${response.status}`, result.message);
      return null;
    }
    return result;
  } catch (e: any) {
    Sentry.captureException("Exception when fetching Aides territoires API", e);
    return null;
  }
};
