"use server";
import "server-only";
import { solutionRetourExperienceFilter, StrapiFilter } from "@/lib/strapi/queries/commonStrapiFilters";
import {
  FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/lib/strapi/strapiClient";
import { APIResponseCollection, APIResponseData } from "@/lib/strapi/types/types";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@/lib/strapi/helpers/strapiArrayUtils";

export const GET_RETOUR_EXPERIENCE_COMPLETE_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT}
${FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT} query {
  retourExperiences ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        titre
        description
        slug
        region {
          data {
            attributes {
              code
            }
          }
        }
        image_principale {
          ...ImageInfo
        }
        citations {
          auteur
          texte
        }
        situation_avant {
          description
          image {
            ...ImageInfo
          }
        }
        situation_apres {
          description
          image {
            ...ImageInfo
          }
        }
        solution_retour_experiences ${solutionRetourExperienceFilter()} {
          data {
            id
            attributes {
              titre
              description
              image {
                ...ImageInfo
              }
              fiche_solution {
                data {
                  ...FicheSolutionSmallCardInfo
                }
              }
            }
          }
        }
        calendrier {
          id
          titre
          date
          description
        }
        financement
        difficultes
        partenaires
        ressources
        credits
        types_solutions
        echelle
        temporalite
        climat_actuel
        climat_futur
        cout
        porteur
        contact
        odds {
          data {
            attributes {
              numero
            }
          }
        }
        retour_experiences ${strapiFilter.publicationStateString()} {
          data {
            ...RetourExperienceCardInfo
          }
        }
      }
    }
  }
}`;

export const GET_RETOUR_EXPERIENCE_CARD_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT} query {
    retourExperiences ${strapiFilter.wholeFilterString()} {
      data {
        ...RetourExperienceCardInfo
      }
    }
}`;

export async function getRetourExperienceBySlug(
  slug: string,
): Promise<APIResponseData<"api::retour-experience.retour-experience"> | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_COMPLETE_DATA(filter)))
    ?.retourExperiences as APIResponseCollection<"api::retour-experience.retour-experience">;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getRetoursExperiences(): Promise<APIResponseData<"api::retour-experience.retour-experience">[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_CARD_DATA(filter)))
    ?.retourExperiences as APIResponseCollection<"api::retour-experience.retour-experience">;
  return safeReturnStrapiEntities(apiResponse);
}
