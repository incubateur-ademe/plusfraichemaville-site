import { useState } from "react";

type FichesDiagnosticFiltersState = {
  echelle: string | null;
  methode: string[] | null;
};

type FichesDiagnosticFiltersKey = "echelle" | "methode";

export type FichesDiagnosticFilterUpdater = {
  updater: (_updatedFilter: string | string[] | null, _key: FichesDiagnosticFiltersKey) => void;
  isActive: (_clickedFilter: string | null, _key: FichesDiagnosticFiltersKey) => boolean | undefined;
};

export const useFichesDiagnosticFilters = () => {
  const [filter, setFilter] = useState<FichesDiagnosticFiltersState>({
    echelle: null,
    methode: null,
  });

  const methodeUpdater = (updatedFilter: string) => {
    setFilter((currentFilter) => {
      const currentMethodes = currentFilter.methode || [];
      const isExisting = currentMethodes.includes(updatedFilter);
      const newMethodes = isExisting
        ? currentMethodes.filter((methode) => methode !== updatedFilter)
        : [...currentMethodes, updatedFilter];
      return { ...currentFilter, methode: newMethodes };
    });
  };

  const isActive = (clickedFilter: string | null, key: FichesDiagnosticFiltersKey) => {
    if (key === "methode") {
      return filter[key]?.includes(clickedFilter as string);
    }
    return clickedFilter === filter[key];
  };

  const updater = (updatedFilter: string | string[] | null, key: FichesDiagnosticFiltersKey) => {
    if (key === "methode" && typeof updatedFilter === "string") {
      methodeUpdater(updatedFilter);
    } else {
      setFilter({ ...filter, [key]: updatedFilter });
    }
  };

  return { isActive, updater };
};
