import { SWRResponse } from "swr";
import useSWRImmutable from "swr/immutable";

export function useSwrWithFetcher<T>(url: string | null): SWRResponse<T> {
  const fetcher = (): Promise<T> => fetch(url ?? "").then((response) => response.json() as T);
  const swr = useSWRImmutable<T>(url ?? null, fetcher);

  return swr;
}
