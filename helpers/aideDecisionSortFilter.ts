import { FicheSolution } from "@/lib/directus/directusModels";

type AideDecisionSortFilter = {
  label: string;
  code: string;
  sortFn: (_: FicheSolution, __: FicheSolution) => number;
  maxItem: number;
};

const SORT_TEMPERATURE: AideDecisionSortFilter = {
  code: "",
  label: "Les plus fraîches",
  sortFn: (fs1, fs2) =>
    fs1.baisse_temperature < fs2.baisse_temperature ? 1 : -1,
  maxItem: 3,
};

const SORT_PRICE: AideDecisionSortFilter = {
  code: "abordable",
  label: "les plus abordables",
  sortFn: (fs1, fs2) =>
    (fs1.cout_maximum - fs1.cout_minimum) / 2 >
    (fs2.cout_maximum - fs2.cout_minimum) / 2
      ? 1
      : -1,
  maxItem: 3,
};

const SORT_SPEED: AideDecisionSortFilter = {
  code: "rapide",
  label: "les plus rapides",
  sortFn: (fs1, fs2) =>
    (fs1.delai_travaux || 1) > (fs2.delai_travaux || 1) ? 1 : -1,
  maxItem: 3,
};

const SORT_ALL: AideDecisionSortFilter = {
  code: "toutes",
  label: "Toutes",
  sortFn: (_, __) => 1,
  maxItem: Number.MAX_SAFE_INTEGER,
};

export const ALL_AIDE_DECISION_SORT_FIELD: AideDecisionSortFilter[] = [
  SORT_TEMPERATURE,
  SORT_SPEED,
  SORT_PRICE,
  SORT_ALL,
];

export const getAideDecisionSortFieldFromCode = (code?: string | null) =>
  ALL_AIDE_DECISION_SORT_FIELD.find((r) => r.code === code) || SORT_TEMPERATURE;
