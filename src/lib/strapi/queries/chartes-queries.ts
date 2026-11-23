"use server";

import { graphql } from "@/src/generated/strapi/gql";
import { strapiTypedGraphQLCall } from "@/src/lib/strapi/strapiClient";
import { safeReturnStrapiEntities } from "@/src/lib/strapi/helpers/strapiArrayUtils";
import {
  getStrapiPublicationStatus,
  getStrapiPublishedRelationFilter,
} from "@/src/lib/strapi/queries/commonStrapiFilters";
import { Charte } from "@/src/lib/strapi/types/api/charte";

// Après toute modification d'une requête de ce fichier : `pnpm run strapi:codegen`.
const GET_ALL_CHARTES = graphql(`
  query GetAllChartes($status: PublicationStatus, $retourExperienceFilters: RetourExperienceFiltersInput) {
    chartes(status: $status) {
      documentId
      nom_collectivite
      annee_signature
      departement {
        code
        nom
      }
      retour_experiences(filters: $retourExperienceFilters) {
        slug
        titre
      }
    }
  }
`);

export async function getAllChartes(): Promise<Charte[]> {
  const apiResponse = await strapiTypedGraphQLCall(GET_ALL_CHARTES, {
    tag: "chartes",
    variables: {
      status: getStrapiPublicationStatus(),
      retourExperienceFilters: getStrapiPublishedRelationFilter(),
    },
  });

  return safeReturnStrapiEntities(apiResponse?.chartes);
}
