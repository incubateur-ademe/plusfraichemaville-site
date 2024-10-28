import { GeoJsonDocument } from "../components/sourcing/types";
import { useSwrWithFetcher } from "./use-swr-with-fetcher";

export const useAddressSearch = (keyword: string | undefined, limit: number, type?: string) => {
  const shouldFetch = keyword && keyword?.trim()?.length >= 3;
  const url = shouldFetch
    ? `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(keyword)}&limit=${limit}${
        type ? `&type=${type}` : ""
      }`
    : null;

  const { data, error, isLoading } = useSwrWithFetcher<GeoJsonDocument>(url);

  if (data && "code" in data) {
    return {
      addresses: [],
      isLoading: false,
      error,
    };
  }

  return {
    addresses: data?.features || [],
    isLoading,
    error,
  };
};
