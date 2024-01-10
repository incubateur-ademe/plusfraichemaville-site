import { APIResponse } from "@/lib/strapi/types/types";

type StrapiEqFilter = { attribute: string; value: string; operator: "eq"; relation: false };
type StrapiInFilter = { attribute: string; value: string[] | number[]; operator: "in"; relation: false };
type StrapiRelationFilter = { attribute: string; operator: "null" | "notNull"; relation: true };
type StrapiSortFilter = { attribute: string; order: "asc" | "desc" };

export class StrapiFilter {
  includePublicationState: boolean;
  andFilters: (StrapiEqFilter | StrapiInFilter | StrapiRelationFilter)[];
  sortFilter?: StrapiSortFilter | undefined;

  constructor(
    includePublicationState: boolean,
    andFilters: (StrapiEqFilter | StrapiInFilter | StrapiRelationFilter)[],
    sortFilter?: StrapiSortFilter,
  ) {
    this.includePublicationState = includePublicationState;
    this.andFilters = andFilters;
    this.sortFilter = sortFilter;
  }

  publicationStateString(): string {
    return ` ( publicationState: ${process.env.STRAPI_SHOW_STATUSES || "LIVE"} ) `;
  }

  wholeFilterString(): string {
    const filterString =
      this.andFilters.length > 0
        ? `filters:{and: [${this.andFilters
            .map((f) => {
              switch (f.relation) {
                case false:
                  return ` {${f.attribute}: {${f.operator}: ${JSON.stringify(f.value)}}} `;
                case true:
                  return ` {${f.attribute} : {id : {${f.operator} : true}}} `;
              }
            })
            .join(",")}]}`
        : null;
    const publicationStateString = this.includePublicationState
      ? `publicationState: ${process.env.STRAPI_SHOW_STATUSES || "LIVE"}`
      : null;
    const sortString = this.sortFilter ? `sort: "${this.sortFilter.attribute}:${this.sortFilter.order}"` : null;
    if (publicationStateString || filterString || sortString) {
      return `( ${[publicationStateString, filterString, sortString].filter(Boolean).join(",")} ) `;
    } else {
      return "";
    }
  }
}

export class AideDecisionEtapeHistory {
  label: string;
  slug: string;
  image: APIResponse<"plugin::upload.file"> | null | undefined;

  constructor(label: string, slug: string, image?: APIResponse<"plugin::upload.file"> | null) {
    this.label = label;
    this.image = image;
    this.slug = slug;
  }
}
