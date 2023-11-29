import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import {
  AideDecisionEtapeHistory,
  contrusctAndFilters,
  DirectusCompleteFilter, getAideDecisionFicheSolutionStatusFilter,
  getAideDecisionFicheTechniqueStatusFilter
} from "@/lib/directus/queries/commonFilters";
import { getHistoryFromAideDecisionEtape } from "@/lib/directus/helpers/getHistoryFromAideDecision";

export const GET_FILTERED_AIDE_DECISION_ETAPE = (filterAideDecisionEtape?: DirectusCompleteFilter) => `query {
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
          id
          titre
          description_courte
          image_principale
          slug
        }
      }
      fiche_technique_id ${contrusctAndFilters([getAideDecisionFicheTechniqueStatusFilter()])} {
        fiche_technique_id{
          id
          titre
          description_courte
          image_principale
          slug
        }
      }
    }
}`;

export const GET_AIDE_DECISION_ETAPE_HISTORY = (aideDecisionEtapeSlug: string) => `query {
  aide_decision_etape (filter: {slug:{_eq: "${aideDecisionEtapeSlug}"}})  {
    slug
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
  aideDecisionEtapeSlug: string,
): Promise<AideDecisionEtapeHistory[] | null> {
  const apiResponse = await directusGraphQLCall(GET_AIDE_DECISION_ETAPE_HISTORY(aideDecisionEtapeSlug));
  if (apiResponse.aide_decision_etape?.length > 0) {
    return getHistoryFromAideDecisionEtape(apiResponse.aide_decision_etape[0]);
  } else {
    return null;
  }
}
