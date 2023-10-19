import { LinkProps } from "next/link";
import { Route } from "next";

export type DirectusSingleFilter = string;

export type DirectusCompleteFilter = string;

export class AideDecisionEtapeHistory {
  label: string;
  linkProps: Omit<LinkProps & { href: Route }, "children">;
  constructor(label: string, slug: string) {
    this.label = label;
    this.linkProps = { href: slug };
  }
}

export function getFicheTechniqueStatusFilter(): DirectusSingleFilter {
  const statusToShow = (process.env.DIRECTUS_FICHES_TECHNIQUES_SHOW_STATUSES || "published")
    .split(",")
    .map((s) => '"' + s + '"');
  return ` {status:{_in: [${statusToShow}]}}`;
}

export function getAideDecisionFicheTechniqueStatusFilter(): DirectusSingleFilter {
  return ` {fiche_technique_id: ${getFicheTechniqueStatusFilter()}}`;
}

export function contrusctAndFilters(filters: DirectusSingleFilter[]): DirectusCompleteFilter {
  return ` (filter: {_and: [${filters.map((filter) => filter).join(",")}]})`;
}
