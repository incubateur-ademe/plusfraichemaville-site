import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { AddressCollectivite, BanAPIResponse } from "@/lib/adresseApi/types";
import { mapAddressApiToCollectiviteAddress } from "@/lib/adresseApi/banApiHelper";

export const fetchCollectiviteFromBanApi = async (
  keyword: string,
  limit: number = 10,
): Promise<AddressCollectivite[]> => {
  try {
    if (keyword.length < 3) {
      return [];
    }
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${keyword}&type=municipality&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    const result = (await response.json()) as BanAPIResponse;

    if ("code" in result) {
      throw new Error(result.message);
    }

    return result.features.map(mapAddressApiToCollectiviteAddress);
  } catch (e: any) {
    customCaptureException("Error when calling API Adresse", e);
    return [];
  }
};
