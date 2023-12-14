"use server";
import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { FicheSolution } from "@/lib/directus/directusModels";
import {
  contrusctAndFilters,
  DirectusCompleteFilter,
  DirectusSingleFilter,
  getStatusFilter,
} from "@/lib/directus/queries/commonFilters";
import {
  FICHE_SOLUTION_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
} from "@/lib/directus/queries/cmsFragments";

export const GET_ALL_FICHES_SOLUTIONS_QUERY = (filterStatus?: DirectusCompleteFilter) => `
  ${FICHE_SOLUTION_CARD_INFO_FRAGMENT}
  query {
    fiche_solution ${filterStatus} {
      ...FicheSolutionCardInfo
    }
}`;

export const GET_FICHE_SOLUTION_COMPLETE_DATA = (filterStatus?: DirectusCompleteFilter) => `
  ${FICHE_SOLUTION_CARD_INFO_FRAGMENT} ${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT}
  query {
    fiche_solution ${filterStatus} {
      ...FicheSolutionCardInfo
      description
        cobenefices {
            cobenefice_id {
              id
              icone
              description
            }
        }
      contexte_titre
      contexte_description
      rafraichissement_attendu_description
      solution_retour_experience {
          retour_experience {
            ...RetourExperienceCardInfo
          }
      }
      fiches_solutions_complementaires {
          related_fiche_solution_id {
              ...FicheSolutionCardInfo
          }
      }
      logo_partenaire
      materiaux {
        materiau_id {
          id
          titre
          image
          description
          cout_minimum_fourniture
          cout_maximum_fourniture
          cout_unite
        }
      }
    }
}`;

export async function getAllFichesSolutions(): Promise<FicheSolution[]> {
  const apiResponse = await directusGraphQLCall(
    GET_ALL_FICHES_SOLUTIONS_QUERY(contrusctAndFilters([getStatusFilter()])),
  );
  return apiResponse?.fiche_solution || [];
}

export async function getFicheSolutionBySlug(slug: string): Promise<FicheSolution | null> {
  const filterSlug: DirectusSingleFilter = ` {slug:{_eq: "${slug}"}}`;
  const filter = contrusctAndFilters([getStatusFilter(), filterSlug]);
  const apiResponse = await directusGraphQLCall(GET_FICHE_SOLUTION_COMPLETE_DATA(filter));
  return apiResponse?.fiche_solution?.length > 0 ? apiResponse.fiche_solution[0] : null;
}

export async function getFicheSolutionByIds(ficheSolutionIds: number[]): Promise<FicheSolution[]> {
  const filterSlug: DirectusSingleFilter = ` {id:{_in: ${JSON.stringify(ficheSolutionIds)}}}`;
  const filter = contrusctAndFilters([getStatusFilter(), filterSlug]);
  const apiResponse = await directusGraphQLCall(GET_ALL_FICHES_SOLUTIONS_QUERY(filter));
  return apiResponse?.fiche_solution || [];
}
