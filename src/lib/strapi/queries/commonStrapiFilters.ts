import { Media } from "@/src/lib/strapi/types/common/Media";
import { isBoolean } from "@/src/helpers/common";

type StrapiEqFilter = { attribute: string; value: string | boolean; operator: "eq"; relation: false };
type StrapiInFilter = { attribute: string; value: string[] | number[]; operator: "in"; relation: false };
type StrapiRelationFilter = { attribute: string; operator: "null" | "notNull"; relation: true };
type StrapiSortFilter = { attribute: string; order: "asc" | "desc" };

const strapiShowStatuses = process.env.STRAPI_SHOW_STATUSES || "LIVE";

export const solutionRetourExperienceFilter = () =>
  strapiShowStatuses === "LIVE"
    ? "(filters:{and: [{fiche_solution: {publishedAt: {notNull: true}}}" +
      ", {retour_experience: {publishedAt: {notNull: true}}} ]} )"
    : "";

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
    return ` ( publicationState: ${strapiShowStatuses} ) `;
  }

  wholeFilterString(): string {
    const filterString =
      this.andFilters.length > 0
        ? `filters:{and: [${this.andFilters
            .map((f) => {
              switch (f.relation) {
                case false:
                  return ` {${f.attribute}: {${f.operator}: ${
                    isBoolean(f.value) ? f.value : JSON.stringify(f.value)
                  }}} `;
                case true:
                  return ` {${f.attribute} : {id : {${f.operator} : true}}} `;
              }
            })
            .join(",")}]}`
        : null;
    const publicationStateString = this.includePublicationState ? `publicationState: ${strapiShowStatuses}` : null;
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
  image: { data: Media } | null | undefined;

  constructor(label: string, slug: string, image?: { data: Media } | null) {
    this.label = label;
    this.image = image;
    this.slug = slug;
  }
}
