"use server";
import { solutionRetourExperienceFilter, StrapiFilter } from "@/src/lib/strapi/queries/commonStrapiFilters";
import {
  FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/src/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/src/lib/strapi/strapiClient";
import { APIResponseCollection, APIResponseData } from "@/src/lib/strapi/types/types";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@/src/lib/strapi/helpers/strapiArrayUtils";

const GET_RETOUR_EXPERIENCE_COMPLETE_DATA = (
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
        types_espaces
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

const GET_RETOUR_EXPERIENCE_CARD_DATA = (
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
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_COMPLETE_DATA(filter), { tag: `get-rex-by-slug-${slug}` })
  )?.retourExperiences as APIResponseCollection<"api::retour-experience.retour-experience">;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getRetoursExperiences(): Promise<APIResponseData<"api::retour-experience.retour-experience">[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_CARD_DATA(filter), { tag: "get-rex" }))
    ?.retourExperiences as APIResponseCollection<"api::retour-experience.retour-experience">;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getAllCompleteRetoursExperiences(): Promise<
  APIResponseData<"api::retour-experience.retour-experience">[]
> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_COMPLETE_DATA(filter), { tag: "get-all-complete-retour-experience" })
  )?.retourExperiences as APIResponseCollection<"api::retour-experience.retour-experience">;
  return safeReturnStrapiEntities(apiResponse);
}
