import { UNITE_COUT_MEGAWATTHEURE } from "@/src/helpers/cout/cout-common";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

type AideDecisionSortFilter = {
  label: string;
  code: string;
  sortFn: (_: FicheSolution, __: FicheSolution) => number;
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
  sortFn: (fs1, fs2) => {
    const fs1HasNoMinMaxCost = !fs1.attributes.cout_maximum && !fs1.attributes.cout_minimum;
    const fs2HasNoMinMaxCost = !fs2.attributes.cout_maximum && !fs2.attributes.cout_minimum;
    if (fs1HasNoMinMaxCost && !fs2HasNoMinMaxCost) {
      return -1;
    } else if (!fs1HasNoMinMaxCost && fs2HasNoMinMaxCost) {
      return 1;
    } else if (
      fs1.attributes.cout_unite === UNITE_COUT_MEGAWATTHEURE.code &&
      fs2.attributes.cout_unite !== UNITE_COUT_MEGAWATTHEURE.code
    ) {
      return 1;
    } else if (
      fs2.attributes.cout_unite === UNITE_COUT_MEGAWATTHEURE.code &&
      fs1.attributes.cout_unite !== UNITE_COUT_MEGAWATTHEURE.code
    ) {
      return -1;
    }
    const cout1 = (fs1.attributes.cout_maximum || 0) - (fs1.attributes.cout_minimum || 0);
    const cout2 = (fs2.attributes.cout_maximum || 0) - (fs2.attributes.cout_minimum || 0);
    return cout1 < cout2 ? -1 : 1;
  },
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
