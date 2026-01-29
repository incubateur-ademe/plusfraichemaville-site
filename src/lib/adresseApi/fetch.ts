import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { AddressCommune, AddressProjet, BanAPIResponse } from "@/src/lib/adresseApi/types";
import { mapAddressApiToAddressProjet, mapAddressApiToCollectiviteAddress } from "@/src/lib/adresseApi/banApiHelper";
import { Feature, GeoJsonProperties, Point } from "geojson";

export const fetchAddressFromBanApi = async (
  keyword: string,
  limit: number,
  type?: string,
): Promise<Feature<Point, GeoJsonProperties>[]> => {
  if (keyword?.trim()?.length < 3) {
    return [];
  }
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${keyword}&limit=${limit}${type ? `&type=${type}` : ""}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );
  const result = (await response.json()) as BanAPIResponse;
  if ("code" in result) {
    throw new Error(`${result.message} ${result.detail}`);
  }
  return result.features;
};

export const fetchCommuneFromBanApi = async (keyword: string, limit: number = 10): Promise<AddressCommune[]> => {
  try {
    const results = await fetchAddressFromBanApi(keyword, limit, "municipality");
    return results.map(mapAddressApiToCollectiviteAddress);
  } catch (e: any) {
    customCaptureException("Error when calling API Adresse for collectvite", e);
    return [];
  }
};

export const fetchProjetAddressFromBanApi = async (keyword: string, limit: number = 10): Promise<AddressProjet[]> => {
  try {
    const results = await fetchAddressFromBanApi(keyword, limit);
    return results.map(mapAddressApiToAddressProjet);
  } catch (e: any) {
    customCaptureException("Error when calling API Adresse for projet", e);
    return [];
  }
};
