"use server";
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
    fiche_technique ${filterStatus} {
        id
        slug
        titre
        description
        description_courte
        status
        image_principale
        odd {
            id
            objectif_developpement_durable_id {
                numero_odd
                description
            }
        }
        etapes_mise_en_oeuvre(sort: [ "order_etape_mise_en_oeuvre" ]) {
            id
            etape_mise_en_oeuvre_id {
                id
                titre
                description
            }
        }
    }
}`;

export async function getFichesTechniques(): Promise<FicheTechnique[]> {
  const apiResponse = await directusGraphQLCall(
    GET_ALL_FICHES_TECHNIQUES_QUERY(contrusctAndFilters([getFicheTechniqueStatusFilter()])),
  );
  return apiResponse?.fiche_technique || [];
}

export async function getFicheTechniqueBySlug(slug: string): Promise<FicheTechnique | null> {
  const filterSlug: DirectusSingleFilter = ` {slug:{_eq: "${slug}"}}`;
  const filter = contrusctAndFilters([getFicheTechniqueStatusFilter(), filterSlug]);
  const apiResponse = await directusGraphQLCall(GET_ALL_FICHES_TECHNIQUES_QUERY(filter));
  return apiResponse?.fiche_technique?.length > 0 ? apiResponse.fiche_technique[0] : null;
}

export async function getFicheTechniqueByIds(ficheTechniqueIds: number[]): Promise<FicheTechnique[]> {
  const filterSlug: DirectusSingleFilter = ` {id:{_in: ${JSON.stringify(ficheTechniqueIds)}}}`;
  const filter = contrusctAndFilters([getFicheTechniqueStatusFilter(), filterSlug]);
  const apiResponse = await directusGraphQLCall(GET_ALL_FICHES_TECHNIQUES_QUERY(filter));
  return apiResponse?.fiche_technique || [];
}
