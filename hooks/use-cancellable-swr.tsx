import { abortablePromise } from "@/helpers/abortable-promise";
import useSWRImmutable from "swr/immutable";

export function useCancellableSWR<T>(key: string, fetcher: Promise<T>) {
  const controller = new AbortController();
  const swr = useSWRImmutable(key, () => abortablePromise(fetcher, controller.signal));

  return [swr, controller] as const;
}
