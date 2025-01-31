"use server";
import "server-only";
import {
  AideDecisionEtapeHistory,
  solutionRetourExperienceFilter,
  StrapiFilter,
} from "@/src/lib/strapi/queries/commonStrapiFilters";
import {
  FICHE_SOLUTION_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/src/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/src/lib/strapi/strapiClient";
import { getHistoryFromAideDecisionEtape } from "@/src/lib/strapi/helpers/getHistoryFromAideDecision";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@/src/lib/strapi/helpers/strapiArrayUtils";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import { APIResponseCollection } from "@/src/lib/strapi/types/strapi-custom-types";

const GET_FILTERED_AIDE_DECISION_ETAPE = (
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
              solution_retour_experiences ${solutionRetourExperienceFilter()} {
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
const GET_ALL_AIDE_DECISION_ETAPE_SLUG = (strapiFilter: StrapiFilter) => `query {
  aideDecisionEtapes ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        slug
      }
    }
  }
}`;

const GET_AIDE_DECISION_ETAPE_HISTORY = (strapiFilter: StrapiFilter) => `  ${STRAPI_IMAGE_FRAGMENT} query {
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

export async function getAideDecisionFirstSteps(): Promise<AideDecisionEtape[]> {
  const filter = new StrapiFilter(
    true,
    [
      {
        attribute: "etape_precedente",
        operator: "null",
        relation: true,
      },
    ],
    { attribute: "rank", order: "asc" },
  );
  const apiResponse = (
    await strapiGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter), { tag: "aide-decision-first-step" })
  )?.aideDecisionEtapes as APIResponseCollection<AideDecisionEtape>;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getAllAideDecisionSlugs(): Promise<AideDecisionEtape[]> {
  const filter = new StrapiFilter(true, []);
  const apiResponse = (
    await strapiGraphQLCall(GET_ALL_AIDE_DECISION_ETAPE_SLUG(filter), { tag: "get-all-aide-decision" })
  )?.aideDecisionEtapes as APIResponseCollection<AideDecisionEtape>;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getAideDecisionBySlug(slug: string): Promise<AideDecisionEtape | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (
    await strapiGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter), { tag: `get-decision-by-slug-${slug}` })
  )?.aideDecisionEtapes as APIResponseCollection<AideDecisionEtape>;
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
    const apiResponse = (
      await strapiGraphQLCall(GET_AIDE_DECISION_ETAPE_HISTORY(filter), {
        tag: `get-aide-decision-history-by-slug-${slug}`,
      })
    )?.aideDecisionEtapes as APIResponseCollection<AideDecisionEtape>;
    if (apiResponse?.data?.length > 0) {
      return getHistoryFromAideDecisionEtape(apiResponse.data[0], includeCurrentStep);
    }
  }
  return null;
}
