import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AIDE_DECISION_SORT_FIELD_NAME = "tri";

export const useAideDecisionSortFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setAideDecisionSortField = useCallback(
    (sortField: string) => {
      const params = new URLSearchParams(searchParams);
      if (sortField) {
        params.set(AIDE_DECISION_SORT_FIELD_NAME, sortField);
      } else {
        params.delete(AIDE_DECISION_SORT_FIELD_NAME);
      }
      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const isAideDecisionSortFieldSelected = (sortField?: string) =>
    (!sortField && !searchParams.get(AIDE_DECISION_SORT_FIELD_NAME)) ||
    searchParams.get(AIDE_DECISION_SORT_FIELD_NAME) === sortField;

  return { setAideDecisionSortField, isAideDecisionSortFieldSelected };
};
