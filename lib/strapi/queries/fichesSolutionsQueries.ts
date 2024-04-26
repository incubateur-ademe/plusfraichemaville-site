"use server";
import "server-only";
import { solutionRetourExperienceFilter, StrapiFilter } from "@/lib/strapi/queries/commonStrapiFilters";
import {
  FICHE_SOLUTION_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/lib/strapi/strapiClient";
import { APIResponseCollection, APIResponseData } from "@/lib/strapi/types/types";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@/lib/strapi/helpers/strapiArrayUtils";

export const GET_FICHE_SOLUTION_COMPLETE_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${FICHE_SOLUTION_CARD_INFO_FRAGMENT}
${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT} query {
  ficheSolutions ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        titre
        type_solution
        description_courte
        image_principale {
          ...ImageInfo
        }
        cout_minimum
        cout_maximum
        baisse_temperature
        portee_baisse_temperature
        libelle_avantage_solution
        delai_travaux_minimum
        delai_travaux_maximum
        types_espace
        slug
        description
        en_savoir_plus
        cobenefices {
          data {
            id
            attributes {
              icone
              description
            }
          }
        }
        contexte_titre
        contexte_description
        rafraichissement_attendu_description
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
        fiches_solutions_complementaires ${strapiFilter.publicationStateString()} {
          data {
            ...FicheSolutionCardInfo
          }
        }
        credits
        materiaux {
          data {
            id
            attributes {
              titre
              image {
                ...ImageInfo
              }
              description
              cout_maximum_fourniture
              cout_minimum_fourniture
              cout_minimum_entretien
              cout_maximum_entretien
              cout_unite
            }
          }
        }
        cout_minimum_entretien
        cout_maximum_entretien
        cout_entretien_unite
        cout_entretien_description
        etapes_diagnostic {
          id
          titre
          description
        }
        etapes_mise_en_oeuvre {
          id
          titre
          description
        }
        etapes_entretien {
          id
          titre
          description
        }
        point_vigilance
        lien_aide_territoire
        lien_fond_vert
        aides_regionales {
          id
          region {
            data {
              attributes {
                code
                nom
              }
            }
          }
          description
        }
        oups {
          id
          description
          titre
          solutions_reparatrices ${strapiFilter.publicationStateString()} {
            data {
              ...FicheSolutionCardInfo
            }
          }
        }
      }
    }
  }
}`;

export const GET_FICHE_SOLUTION_CARD_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT}  ${FICHE_SOLUTION_CARD_INFO_FRAGMENT} query {
    ficheSolutions ${strapiFilter.wholeFilterString()} {
      data {
        ...FicheSolutionCardInfo
      }
    }
}`;

export async function getFicheSolutionBySlug(
  slug: string,
): Promise<APIResponseData<"api::fiche-solution.fiche-solution"> | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_SOLUTION_COMPLETE_DATA(filter)))
    ?.ficheSolutions as APIResponseCollection<"api::fiche-solution.fiche-solution">;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getFicheSolutionById(
  ficheSolutionId: string,
  signal?: AbortSignal,
): Promise<APIResponseData<"api::fiche-solution.fiche-solution"> | null> {
  const filter = new StrapiFilter(true, [{ attribute: "id", operator: "eq", value: ficheSolutionId, relation: false }]);
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_SOLUTION_COMPLETE_DATA(filter), null, signal))
    ?.ficheSolutions as APIResponseCollection<"api::fiche-solution.fiche-solution">;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getAllFichesSolutions(): Promise<APIResponseData<"api::fiche-solution.fiche-solution">[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_SOLUTION_CARD_DATA(filter)))
    ?.ficheSolutions as APIResponseCollection<"api::fiche-solution.fiche-solution">;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getFicheSolutionByIds(
  ficheSolutionIds: number[],
): Promise<APIResponseData<"api::fiche-solution.fiche-solution">[]> {
  const filter = new StrapiFilter(true, [
    {
      attribute: "id",
      operator: "in",
      value: ficheSolutionIds,
      relation: false,
    },
  ]);
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_SOLUTION_CARD_DATA(filter)))
    ?.ficheSolutions as APIResponseCollection<"api::fiche-solution.fiche-solution">;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getFicheSolutionByIdsComplete(
  ficheSolutionIds: number[],
): Promise<APIResponseData<"api::fiche-solution.fiche-solution">[]> {
  const filter = new StrapiFilter(true, [
    {
      attribute: "id",
      operator: "in",
      value: ficheSolutionIds,
      relation: false,
    },
  ]);
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_SOLUTION_COMPLETE_DATA(filter)))
    ?.ficheSolutions as APIResponseCollection<"api::fiche-solution.fiche-solution">;
  return safeReturnStrapiEntities(apiResponse);
}
