import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import {
  AideDecisionEtapeHistory,
  contrusctAndFilters,
  DirectusCompleteFilter,
  getAideDecisionFicheSolutionStatusFilter,
} from "@/lib/directus/queries/commonFilters";
import { getHistoryFromAideDecisionEtape } from "@/lib/directus/helpers/getHistoryFromAideDecision";
import { FICHE_SOLUTION_CARD_INFO_FRAGMENT } from "@/lib/directus/queries/cmsFragments";

export const GET_FILTERED_AIDE_DECISION_ETAPE = (
  filterAideDecisionEtape?: DirectusCompleteFilter,
) => ` ${FICHE_SOLUTION_CARD_INFO_FRAGMENT} query {
    aide_decision_etape ${filterAideDecisionEtape}  {
      id
      nom
      description
      image
      slug
      etape_parente_id {
        id
        nom
        description
        image
        slug
        question_suivante
      }
      fiches_solutions ${contrusctAndFilters([getAideDecisionFicheSolutionStatusFilter()])} {
        fiche_solution_id{
          ...FicheSolutionCardInfo
          solution_retour_experience {
            id
            retour_experience {
                id
                titre
                image_principale
                climat_actuel
                climat_futur
                types_espace
                region
                slug
            }
          }
        }
      }
    }
}`;

export const GET_AIDE_DECISION_ETAPE_HISTORY = (aideDecisionEtapeSlug: string) => `query {
  aide_decision_etape (filter: {slug:{_eq: "${aideDecisionEtapeSlug}"}})  {
    nom
    slug
    image
    etape_parente_id {
      nom
      slug
      image
      etape_parente_id{
        nom
        slug
        image
        etape_parente_id{
          nom
          slug
          image
          etape_parente_id{
            nom
            slug
            image
          }
        }
      }
    }
  }
}`;

export async function getAideDecisionFirstSteps(): Promise<AideDecisionEtape[]> {
  const filter: DirectusCompleteFilter = ` (filter: {etape_parente_id: {id:{_null:true}}})`;
  const apiResponse = await directusGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter));
  return apiResponse?.aide_decision_etape || [];
}

export async function getAideDecisionEtapesByEtapeParentSlug(etapeParenteSlug: string): Promise<AideDecisionEtape[]> {
  const filter: DirectusCompleteFilter = ` (filter: {etape_parente_id: {slug:{_eq: "${etapeParenteSlug}"}}})`;
  const apiResponse = await directusGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter));
  return apiResponse?.aide_decision_etape || [];
}

export async function getAideDecisionEtapeBySlug(aideDecisionEtapeSlug: string): Promise<AideDecisionEtape | null> {
  const filter: DirectusCompleteFilter = ` (filter: {slug:{_eq: "${aideDecisionEtapeSlug}"}})`;
  const apiResponse = await directusGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter));
  return apiResponse.aide_decision_etape?.length > 0 ? apiResponse.aide_decision_etape[0] : null;
}

export async function getAideDecisionHistoryBySlug(
  aideDecisionEtapeSlug?: string,
  includeCurrentStep = false,
): Promise<AideDecisionEtapeHistory[] | null> {
  if (aideDecisionEtapeSlug) {
    const apiResponse = await directusGraphQLCall(GET_AIDE_DECISION_ETAPE_HISTORY(aideDecisionEtapeSlug));
    if (apiResponse.aide_decision_etape?.length > 0) {
      return getHistoryFromAideDecisionEtape(apiResponse.aide_decision_etape[0], includeCurrentStep);
    }
  }
  return null;
}
