import { APIResponse } from "@/lib/strapi/types/types";

export type StrapiSingleFilter = string;

export type StrapiCompleteFilter = string;

type StrapiEqFilter = { attribute: string; value: string; operator: "eq"; relation: false };
type StrapiInFilter = { attribute: string; value: string; operator: "in"; relation: false };
type StrapiRelationFilter = { attribute: string; operator: "null" | "notNull"; relation: true };

export class StrapiFilter {
  includePublicationState: boolean;
  andFilters: (StrapiEqFilter | StrapiInFilter | StrapiRelationFilter)[];

  constructor(
    includePublicationState: boolean,
    andFilters: (StrapiEqFilter | StrapiInFilter | StrapiRelationFilter)[],
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
  image: APIResponse<"plugin::upload.file"> | null | undefined;

  constructor(label: string, slug: string, image?: APIResponse<"plugin::upload.file"> | null) {
    this.label = label;
    this.image = image;
    this.slug = slug;
  }
}
