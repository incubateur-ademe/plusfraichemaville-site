import { Media } from "@/src/lib/strapi/types/common/Media";
import { isBoolean } from "@/src/helpers/common";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";

type StrapiEqFilter = { attribute: string; value: string | boolean; operator: "eq"; relation: false };
type StrapiInFilter = { attribute: string; value: string[]; operator: "in"; relation: false };
type StrapiRelationFilter = { attribute: string; operator: "null" | "notNull"; relation: true };
type StrapiSortFilter = { attribute: string; order: "asc" | "desc" };

const strapiShowStatuses = process.env.STRAPI_SHOW_STATUSES || "LIVE";
// Strapi v5 replaced the GraphQL `publicationState: LIVE | PREVIEW` argument with `status: PUBLISHED | DRAFT`.
// `status: DRAFT` returns the draft version of every document (published or not), which is the closest
// equivalent to the old `PREVIEW` behaviour.
const strapiStatus = strapiShowStatuses === "LIVE" ? "PUBLISHED" : "DRAFT";

export const solutionRetourExperienceFilter = () =>
  strapiShowStatuses === "LIVE"
    ? "(filters:{and: [{fiche_solution: {publishedAt: {notNull: true}}}" +
      ", {retour_experience: {publishedAt: {notNull: true}}} ]} )"
    : "";

export const ficheDiagnosticRetourExperienceDiagnosticFilter = () =>
  strapiShowStatuses === "LIVE"
    ? "(filters:{and: [{fiche_diagnostic: {publishedAt: {notNull: true}}}" +
      ", {retour_experience_diagnostic: {publishedAt: {notNull: true}}} ]} )"
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

  // Only ever used on relation fields, never on the root Query field. Strapi v5's GraphQL relation
  // fields accept `filters`/`pagination`/`sort` but NOT `status` (that argument only exists on the
  // root query). We approximate "LIVE" (published only) with a `publishedAt` filter instead; in
  // preview/draft mode we apply no filter, so both draft and published entries come back.
  publicationStateString(): string {
    return strapiShowStatuses === "LIVE" ? ` ( filters: { publishedAt: { notNull: true } } ) ` : "";
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
                  return ` {${f.attribute} : {documentId : {${f.operator} : true}}} `;
              }
            })
            .join(",")}]}`
        : null;
    const statusString = this.includePublicationState ? `status: ${strapiStatus}` : null;
    const sortString = this.sortFilter ? `sort: "${this.sortFilter.attribute}:${this.sortFilter.order}"` : null;
    if (statusString || filterString || sortString) {
      return `( ${[statusString, filterString, sortString].filter(Boolean).join(",")} ) `;
    } else {
      return "";
    }
  }
}

export class AideDecisionEtapeHistory {
  label: string;
  slug: string;
  image: Media | null | undefined;

  constructor(label: string, slug: string, image?: Media | null) {
    this.label = label;
    this.image = image;
    this.slug = slug;
  }
}

export type AideDecisionStepData = {
  etape: AideDecisionEtape | null;
  historique: AideDecisionEtapeHistory[] | null;
};
