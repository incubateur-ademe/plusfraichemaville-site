import { useState } from "react";

export type AideEstimationEditFiltersState = {
  showAidesFinancieres: boolean;
  showAidesIngenierie: boolean;
  selectedAides: boolean;
};

export type FichesDiagnosticFiltersKey = "showAidesFinancieres" | "showAidesIngenierie" | "selectedAides";

export const useAideEstimationEditFilter = () => {
  const [filters, setFilters] = useState<AideEstimationEditFiltersState>({
    showAidesFinancieres: true,
    showAidesIngenierie: true,
    selectedAides: false,
  });

  const toggleFilter = (key: FichesDiagnosticFiltersKey) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };

  return { filters, toggleFilter };
};
