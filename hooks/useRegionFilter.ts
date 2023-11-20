import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const REGION_FILTER_NAME = "regionFilter";

export const useRegionFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const changeRegionFilter = useCallback(
    (regionCode: string) => {
      const params = new URLSearchParams(searchParams);
      const currentRegionsParam = params.get(REGION_FILTER_NAME);
      const currentRegions = currentRegionsParam ? currentRegionsParam.split(",") : [];
      const regionIndex = currentRegions.indexOf(regionCode);
      if (regionIndex > -1) {
        currentRegions.splice(regionIndex, 1);
      } else {
        currentRegions.push(regionCode);
      }
      if (currentRegions.length > 0) {
        params.set(REGION_FILTER_NAME, currentRegions.join(","));
      } else {
        params.delete(REGION_FILTER_NAME);
      }
      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const clearRegionFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete(REGION_FILTER_NAME);
    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [pathname, router, searchParams]);

  const isRegionSelected = (regionCode: string) =>
    searchParams.get(REGION_FILTER_NAME)?.split(",").includes(regionCode);

  return { changeRegionFilter, clearRegionFilter, isRegionSelected };
};
