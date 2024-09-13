import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TYPE_ESPACE_FILTER_NAME = "espaceFilter";

export const useTypeEspaceFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setTypeEspaceFilter = useCallback(
    (typeEspaceCode: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(TYPE_ESPACE_FILTER_NAME, typeEspaceCode);
      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearTypeEspaceFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete(TYPE_ESPACE_FILTER_NAME);
    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [pathname, router, searchParams]);

  const isTypeEspaceSelected = (typeEspace?: string) =>
    (!typeEspace && !searchParams.get(TYPE_ESPACE_FILTER_NAME)) ||
    searchParams.get(TYPE_ESPACE_FILTER_NAME) === typeEspace;

  return { setTypeEspaceFilter, clearTypeEspaceFilter, isTypeEspaceSelected };
};
