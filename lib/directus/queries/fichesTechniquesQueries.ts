import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { FicheTechnique } from "@/lib/directus/directusModels";
import {
  contrusctAndFilters,
  DirectusCompleteFilter,
  DirectusSingleFilter,
  getFicheTechniqueStatusFilter,
} from "@/lib/directus/queries/commonFilters";

export const GET_ALL_FICHES_TECHNIQUES_QUERY = (filterStatus?: DirectusCompleteFilter) => `query {
    fiche_technique ${filterStatus?.completeFilter} {
        id
        titre
        description
        status
        image_principale
        
    }
}`;

export async function getFichesTechniques(): Promise<FicheTechnique[]> {
  const apiResponse = await directusGraphQLCall(
    GET_ALL_FICHES_TECHNIQUES_QUERY(contrusctAndFilters([getFicheTechniqueStatusFilter()])),
  );
  return apiResponse?.fiche_technique || [];
}

export async function getFicheTechniqueBySlug(slug: string): Promise<FicheTechnique | null> {
  const filterSlug: DirectusSingleFilter = { filter: ` {slug:{_eq: "${slug}"}}` };
  const filter = contrusctAndFilters([getFicheTechniqueStatusFilter(), filterSlug]);
  const apiResponse = await directusGraphQLCall(GET_ALL_FICHES_TECHNIQUES_QUERY(filter));
  return apiResponse?.fiche_technique?.length > 0 ? apiResponse.fiche_technique[0] : null;
}
