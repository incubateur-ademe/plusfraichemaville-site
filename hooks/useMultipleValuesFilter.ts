import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useMultipleValuesFilter = (filterName : string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const changeFilter = useCallback(
    (filterCode: string) => {
      const params = new URLSearchParams(searchParams);
      const currentFilterParam = params.get(filterName);
      const currentFilters = currentFilterParam ? currentFilterParam.split(",") : [];
      const regionIndex = currentFilters.indexOf(filterCode);
      if (regionIndex > -1) {
        currentFilters.splice(regionIndex, 1);
      } else {
        currentFilters.push(filterCode);
      }
      if (currentFilters.length > 0) {
        params.set(filterName, currentFilters.join(","));
      } else {
        params.delete(filterName);
      }
      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const clearFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete(filterName);
    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [pathname, router, searchParams]);

  const isFilterCodeSelected = (filterCode: string) =>
    searchParams.get(filterName)?.split(",").includes(filterCode);

  return { changeFilter, clearFilter, isFilterCodeSelected };
};
