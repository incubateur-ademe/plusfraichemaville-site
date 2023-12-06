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

export const GET_ALL_FICHES_SOLUTIONS_QUERY = (filterStatus?: DirectusCompleteFilter) => `query {
    fiche_solution ${filterStatus} {
          id
          titre
          description_courte
          image_principale
          type_solution
          baisse_temperature
          delai_travaux
          cout_minimum
          cout_maximum
          slug
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
  const apiResponse = await directusGraphQLCall(GET_ALL_FICHES_SOLUTIONS_QUERY(filter));
  return apiResponse?.fiche_solution?.length > 0 ? apiResponse.fiche_solution[0] : null;
}

export async function getFicheSolutionByIds(ficheSolutionIds: number[]): Promise<FicheSolution[]> {
  const filterSlug: DirectusSingleFilter = ` {id:{_in: ${JSON.stringify(ficheSolutionIds)}}}`;
  const filter = contrusctAndFilters([getStatusFilter(), filterSlug]);
  const apiResponse = await directusGraphQLCall(GET_ALL_FICHES_SOLUTIONS_QUERY(filter));
  return apiResponse?.fiche_solution || [];
}
