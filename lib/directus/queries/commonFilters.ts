export type DirectusSingleFilter = {
  filter: string;
};

export type DirectusCompleteFilter = {
  completeFilter: string;
};

export function getFicheTechniqueStatusFilter(): DirectusSingleFilter {
  const statusToShow = (process.env.DIRECTUS_FICHES_TECHNIQUES_SHOW_STATUSES || "published")
    .split(",")
    .map((s) => '"' + s + '"');
  return { filter: ` {status:{_in: [${statusToShow}]}}` };
}

export function getAideDecisionFicheTechniqueStatusFilter(): DirectusSingleFilter {
  return { filter: ` {fiche_technique_id: ${getFicheTechniqueStatusFilter().filter}}` };
}

export function contrusctAndFilters(filters: DirectusSingleFilter[]): DirectusCompleteFilter {
  return { completeFilter: ` (filter: {_and: [${filters.map((filter) => filter.filter).join(",")}]})` };
}
