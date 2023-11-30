import { LinkProps } from "next/link";
import { Route } from "next";

export type DirectusSingleFilter = string;

export type DirectusCompleteFilter = string;

export class AideDecisionEtapeHistory {
  label: string;
  slug: string;
  linkProps: Omit<LinkProps & { href: Route }, "children">;
  image: string | null;
  constructor(label: string, slug: string, image: string | null) {
    this.label = label;
    this.linkProps = { href: slug };
    this.image = image;
    this.slug = slug;
  }
}

export function getStatusFilter(): DirectusSingleFilter {
  const statusToShow = (process.env.DIRECTUS_SHOW_STATUSES || "published").split(",").map((s) => '"' + s + '"');
  return ` {status:{_in: [${statusToShow}]}}`;
}

export function getAideDecisionFicheSolutionStatusFilter(): DirectusSingleFilter {
  return ` {fiche_solution_id: ${getStatusFilter()}}`;
}

export function contrusctAndFilters(filters: DirectusSingleFilter[], sortField?: string): DirectusCompleteFilter {
  const filterArgument = `filter: {_and: [${filters.map((filter) => filter).join(",")}]}`;
  const sortArgument = sortField ? ` sort: "${sortField}" ` : "";
  return ` (${[filterArgument, sortArgument].filter(Boolean).join(",")})`;
}
