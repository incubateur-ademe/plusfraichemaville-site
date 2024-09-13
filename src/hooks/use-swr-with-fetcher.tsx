import useSWR, { SWRResponse } from "swr";
import useSWRImmutable from "swr/immutable";

export function useImmutableSwrWithFetcher<T>(url: string | null): SWRResponse<T> {
  const fetcher = (): Promise<T> => fetch(url ?? "").then((response) => response.json() as T);
  return useSWRImmutable<T>(url ?? null, fetcher);
}

export function useSwrWithFetcher<T>(url: string | null): SWRResponse<T> {
  const fetcher = (): Promise<T> => fetch(url ?? "").then((response) => response.json() as T);
  return useSWR<T>(url ?? null, fetcher);
}
