"use server";
import "server-only";
import { AideDecisionEtapeHistory, StrapiFilter } from "@/lib/strapi/queries/commonStrapiFilters";
import {
  FICHE_SOLUTION_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/lib/strapi/strapiClient";
import { APIResponseCollection, APIResponseData } from "@/lib/strapi/types/types";
import { getHistoryFromAideDecisionEtape } from "@/lib/strapi/helpers/getHistoryFromAideDecision";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@/lib/strapi/helpers/strapiArrayUtils";

export const GET_FILTERED_AIDE_DECISION_ETAPE = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${FICHE_SOLUTION_CARD_INFO_FRAGMENT}
${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT} query {
  aideDecisionEtapes ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        nom
        description
        slug
        image {
          ...ImageInfo
        }
        question_suivante
        etape_precedente {
          data {
            attributes {
              slug
            }
          }
        }
        fiches_solutions ${strapiFilter.publicationStateString()} {
          data {
            id
            ...FicheSolutionCardInfo
            attributes{
              solution_retour_experiences {
                data {
                  attributes {
                    retour_experience {
                      data {
                        ...RetourExperienceCardInfo
                      }
                    }
                  }
                }
              }
            }
          }
        }
        etapes_suivantes ${strapiFilter.publicationStateString()} {
          data {
            id
            attributes {
              nom
              description
              slug
              image {
                ...ImageInfo
              }
            }
          }
        }
      }
    }
  }
}`;

export const GET_AIDE_DECISION_ETAPE_HISTORY = (strapiFilter: StrapiFilter) => `  ${STRAPI_IMAGE_FRAGMENT} query {
  aideDecisionEtapes ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        nom
        slug
        image {
          ...ImageInfo
        }
        etape_precedente {
          data {
            attributes {
              nom
              slug
              image {
                ...ImageInfo
              }
              etape_precedente {
                data {
                  attributes {
                    nom
                    slug
                    image {
                      ...ImageInfo
                    }
                    etape_precedente {
                      data {
                        attributes {
                          nom
                          slug
                          image {
                            ...ImageInfo
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export async function getAideDecisionFirstSteps(): Promise<
  APIResponseData<"api::aide-decision-etape.aide-decision-etape">[]
> {
  const filter = new StrapiFilter(true, [{ attribute: "etape_precedente", operator: "null", relation: true }]);
  const apiResponse = (await strapiGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter)))
    ?.aideDecisionEtapes as APIResponseCollection<"api::aide-decision-etape.aide-decision-etape">;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getAideDecisionBySlug(
  slug: string,
): Promise<APIResponseData<"api::aide-decision-etape.aide-decision-etape"> | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (await strapiGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter)))
    ?.aideDecisionEtapes as APIResponseCollection<"api::aide-decision-etape.aide-decision-etape">;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getAideDecisionHistoryBySlug(
  slug?: string,
  includeCurrentStep = false,
): Promise<AideDecisionEtapeHistory[] | null> {
  if (slug) {
    const filter = new StrapiFilter(true, [
      {
        attribute: "slug",
        operator: "eq",
        value: slug,
        relation: false,
      },
    ]);
    const apiResponse = (await strapiGraphQLCall(GET_AIDE_DECISION_ETAPE_HISTORY(filter)))
      ?.aideDecisionEtapes as APIResponseCollection<"api::aide-decision-etape.aide-decision-etape">;
    if (apiResponse?.data?.length > 0) {
      return getHistoryFromAideDecisionEtape(apiResponse.data[0].attributes, includeCurrentStep);
    }
  }
  return null;
}
