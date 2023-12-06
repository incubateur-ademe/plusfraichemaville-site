type AideDecisionSortFilter = {
  label: string;
  code: string;
};

export const ALL_AIDE_DECISION_SORT_FIELD: AideDecisionSortFilter[] = [
  { code: "", label: "Les plus fraîches" },
  { code: "rapide", label: "les plus rapides" },
  { code: "abordable", label: "les plus abordables" },
  { code: "toutes", label: "Toutes" },
];
