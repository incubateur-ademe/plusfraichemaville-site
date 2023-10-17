import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { AideDecisionEtape, TypeEspace } from "@/lib/directus/directusModels";
import {
  contrusctAndFilters,
  DirectusCompleteFilter,
  getAideDecisionFicheTechniqueStatusFilter,
} from "@/lib/directus/queries/commonFilters";

export const GET_ALL_TYPE_ESPACE_QUERY = `query {
    type_espace {
        id
        nom
        icone
        sort
        slug
        question_suivante
    }
}`;

export const GET_FILTERED_AIDE_DECISION_ETAPE = (filterAideDecisionEtape?: DirectusCompleteFilter) => `query {
    aide_decision_etape ${filterAideDecisionEtape}  {
      id
      nom
      description
      image
      slug
      type_espace_id {
        id
        nom
        icone
        slug
        question_suivante
      }
      etape_parente_id {
        id
        nom
        description
        image
        slug
        question_suivante
      }
      fiche_technique_id ${contrusctAndFilters([getAideDecisionFicheTechniqueStatusFilter()])} {
        fiche_technique_id{
          titre
          description
          image_principale
          slug
        }
      }
    }
}`;

export async function getAllTypeEspace(): Promise<TypeEspace[]> {
  const apiResponse = await directusGraphQLCall(GET_ALL_TYPE_ESPACE_QUERY);
  return apiResponse?.type_espace || [];
}

export async function getAideDecisionEtapeByTypeEspaceSlug(typeEspaceSlug: string): Promise<AideDecisionEtape[]> {
  const filter: DirectusCompleteFilter = ` (filter: {type_espace_id: {slug:{_eq: "${typeEspaceSlug}"}}})`;
  const apiResponse = await directusGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter));
  return apiResponse?.aide_decision_etape || [];
}

export async function getAideDecisionEtapeByEtapeParentSlug(etapeParenteSlug: string): Promise<AideDecisionEtape[]> {
  const filter: DirectusCompleteFilter = ` (filter: {etape_parente_id: {slug:{_eq: "${etapeParenteSlug}"}}})`;
  const apiResponse = await directusGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter));
  return apiResponse?.aide_decision_etape || [];
}

export async function getAideDecisionEtapeBySlug(aideDecisionEtapeSlug: string): Promise<AideDecisionEtape | null> {
  const filter: DirectusCompleteFilter = ` (filter: {slug:{_eq: "${aideDecisionEtapeSlug}"}})`;
  const apiResponse = await directusGraphQLCall(GET_FILTERED_AIDE_DECISION_ETAPE(filter));
  return apiResponse.aide_decision_etape?.length > 0 ? apiResponse.aide_decision_etape[0] : null;
}
