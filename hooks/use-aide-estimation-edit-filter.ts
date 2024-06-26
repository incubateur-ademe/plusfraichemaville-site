import { useState } from "react";

export type AideEstimationEditFiltersState = {
  showAidesFinancieres: boolean;
  showAidesIngenierie: boolean;
};

export type FichesDiagnosticFiltersKey = "showAidesFinancieres" | "showAidesIngenierie";

export const useAideEstimationEditFilter = () => {
  const [filters, setFilters] = useState<AideEstimationEditFiltersState>({
    showAidesFinancieres: true,
    showAidesIngenierie: true,
  });

  const toggleFilter = (key: FichesDiagnosticFiltersKey) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };

  return { filters, toggleFilter };
};
