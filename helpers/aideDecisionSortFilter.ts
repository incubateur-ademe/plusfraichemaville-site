import { APIResponseData } from "@/lib/strapi/types/types";

type AideDecisionSortFilter = {
  label: string;
  code: string;
  sortFn: (
    _: APIResponseData<"api::fiche-solution.fiche-solution">,
    __: APIResponseData<"api::fiche-solution.fiche-solution">,
  ) => number;
  maxItem: number;
};

const SORT_TEMPERATURE: AideDecisionSortFilter = {
  code: "",
  label: "Les plus fraîches",
  sortFn: (fs1, fs2) => ((fs1.attributes.baisse_temperature || 0) < (fs2.attributes.baisse_temperature || 0) ? 1 : -1),
  maxItem: 3,
};

const SORT_PRICE: AideDecisionSortFilter = {
  code: "abordable",
  label: "Les plus abordables",
  sortFn: (fs1, fs2) =>
    ((fs1.attributes.cout_maximum || 0) - (fs1.attributes.cout_minimum || 0)) / 2 >
    ((fs2.attributes.cout_maximum || 0) - (fs2.attributes.cout_minimum || 0)) / 2
      ? 1
      : -1,
  maxItem: 3,
};

const SORT_SPEED: AideDecisionSortFilter = {
  code: "rapide",
  label: "Les plus rapides",
  sortFn: (fs1, fs2) =>
    ((fs1.attributes.delai_travaux_maximum || 0) - (fs1.attributes.delai_travaux_minimum || 0)) / 2 >
    ((fs2.attributes.delai_travaux_maximum || 0) - (fs2.attributes.delai_travaux_minimum || 0)) / 2
      ? 1
      : -1,
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
