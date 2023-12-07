import { FicheSolution } from "@/lib/directus/directusModels";

type AideDecisionSortFilter = {
  label: string;
  code: string;
  sortFn: (_: { fiche_solution_id: FicheSolution }, __: { fiche_solution_id: FicheSolution }) => number;
  maxItem: number;
};

export const ALL_AIDE_DECISION_SORT_FIELD: AideDecisionSortFilter[] = [
  {
    code: "",
    label: "Les plus fraîches",
    sortFn: (fs1, fs2) =>
      fs1.fiche_solution_id.baisse_temperature < fs2.fiche_solution_id.baisse_temperature ? 1 : -1,
    maxItem: 3,
  },
  {
    code: "rapide",
    label: "les plus rapides",
    sortFn: (fs1, fs2) =>
      (fs1.fiche_solution_id.delai_travaux || 1) > (fs2.fiche_solution_id.delai_travaux || 1) ? 1 : -1,
    maxItem: 3,
  },
  {
    code: "abordable",
    label: "les plus abordables",
    sortFn: (fs1, fs2) =>
      (fs1.fiche_solution_id.cout_maximum - fs1.fiche_solution_id.cout_minimum) / 2 >
      (fs2.fiche_solution_id.cout_maximum - fs2.fiche_solution_id.cout_minimum) / 2
        ? 1
        : -1,
    maxItem: 3,
  },
  {
    code: "toutes",
    label: "Toutes",
    sortFn: (_, __) => 1,
    maxItem: Number.MAX_SAFE_INTEGER,
  },
];

export const getAideDecisionSortFieldFromCode = (code?: string | null) =>
  ALL_AIDE_DECISION_SORT_FIELD.find((r) => r.code === code) || ALL_AIDE_DECISION_SORT_FIELD[0];
