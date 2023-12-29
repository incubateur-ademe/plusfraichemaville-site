import { LinkProps } from "next/link";
import { Route } from "next";

export type StrapiSingleFilter = string;

export type StrapiCompleteFilter = string;

type StrapiEqFilter = { attribute: string; value: string; operator: "eq" };
type StrapiInFilter = { attribute: string; value: string; operator: "in" };

export class StrapiFilter {
  includePublicationState: boolean;
  andFilters: (StrapiEqFilter | StrapiInFilter)[];

  constructor(
    includePublicationState: boolean,
    andFilters: (StrapiEqFilter | StrapiInFilter)[],
  ) {
    this.includePublicationState = includePublicationState;
    this.andFilters = andFilters;
  }

  publicationStateString(): string {
    return ` ( publicationState: ${process.env.STRAPI_SHOW_STATUSES || "LIVE"} ) `;
  }

  wholeFilterString(): string {
    const filterString =
      this.andFilters.length > 0
        ? `filters:{and: [${this.andFilters
          .map((f) => ` {${f.attribute}: {${f.operator}: ${JSON.stringify(f.value)}}} `)
          .join(",")}]}`
        : null;
    const publicationStateString = this.includePublicationState
      ? `publicationState: ${process.env.STRAPI_SHOW_STATUSES || "LIVE"}`
      : null;
    if (publicationStateString || filterString) {
      return `( ${[publicationStateString, filterString].filter(Boolean).join(",")} ) `;
    } else {
      return "";
    }
  }
}

export class AideDecisionEtapeHistory {
  label: string;
  slug: string;
  linkProps: Omit<LinkProps & { href: Route }, "children">;
  image: string | null | undefined;

  constructor(label: string, slug: string, image?: string | null) {
    this.label = label;
    this.linkProps = { href: slug };
    this.image = image;
    this.slug = slug;
  }
}

export function getStatusFilter(): StrapiSingleFilter {
  const statusToShow = process.env.STRAPI_SHOW_STATUSES || "PREVIEW";
  return ` publicationState: ${statusToShow}} `;
}

export function getAideDecisionFicheSolutionStatusFilter(): StrapiSingleFilter {
  return ` {fiche_solution_id: ${getStatusFilter()}}`;
}

export function contructAndFilters(filters: StrapiSingleFilter[], sortField?: string): StrapiCompleteFilter {
  const filterArgument = `filters: {_and: [${filters.map((filter) => filter).join(",")}]}`;
  const sortArgument = sortField ? ` sort: "${sortField}" ` : "";
  return ` (${[filterArgument, sortArgument].filter(Boolean).join(",")})`;
}
