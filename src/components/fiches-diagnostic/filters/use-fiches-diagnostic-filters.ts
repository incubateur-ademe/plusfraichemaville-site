type FichesDiagnosticFiltersKey = "echelle" | "methode";

export type FichesDiagnosticFilterUpdater = {
  updater: (_updatedFilter: string | string[] | null, _key: FichesDiagnosticFiltersKey) => void;
  isActive: (_clickedFilter: string | null, _key: FichesDiagnosticFiltersKey) => boolean | undefined;
};
