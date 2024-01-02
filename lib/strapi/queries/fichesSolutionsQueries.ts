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

export const GET_FICHE_SOLUTION_COMPLETE_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${FICHE_SOLUTION_CARD_INFO_FRAGMENT}
${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT} query {
  ficheSolutions ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        vuid
        titre
        type_solution
        description_courte
        image_principale {
          ...ImageInfo
        }
        cout_minimum
        cout_maximum
        baisse_temperature
        delai_travaux
        types_espace
        slug
        description
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
        fiches_solutions_complementaires ${strapiFilter.publicationStateString()} {
          data {
            ...FicheSolutionCardInfo
          }
        }
        logo_partenaire {
          data {
            attributes {
              url
            }
          }
        }
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
              cout_unite
            }
          }
        }
        cout_minimum_entretien
        cout_maximum_entretien
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
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug }]);
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_SOLUTION_COMPLETE_DATA(filter)))
    ?.ficheSolutions as APIResponseCollection<"api::fiche-solution.fiche-solution">;
  return apiResponse?.data?.length > 0 ? apiResponse.data[0] : null;
}

export async function getAllFichesSolutions(): Promise<APIResponseData<"api::fiche-solution.fiche-solution">[]> {
  const filter = new StrapiFilter(true, []);
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_SOLUTION_CARD_DATA(filter)))
    ?.ficheSolutions as APIResponseCollection<"api::fiche-solution.fiche-solution">;
  return apiResponse?.data || [];
}