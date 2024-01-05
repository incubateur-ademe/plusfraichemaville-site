"use server";
import "server-only";
import { StrapiFilter } from "@/lib/strapi/queries/commonStrapiFilters";
import {
  FICHE_SOLUTION_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/lib/strapi/strapiClient";
import { APIResponseCollection, APIResponseData } from "@/lib/strapi/types/types";

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
        etapes_suivantes {
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

export async function getAideDecisionFirstSteps(): Promise<
  APIResponseData<"api::aide-decision-etape.aide-decision-etape">[]
> {
  const filter = new StrapiFilter(true, [{ attribute: "etape_precedente", operator: "null", relation: true }]);
  const apiResponse = (await strapiGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter)))
    ?.aideDecisionEtapes as APIResponseCollection<"api::aide-decision-etape.aide-decision-etape">;
  return apiResponse?.data || [];
}

