"use server";
import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { RetourExperience } from "@/lib/directus/directusModels";
import {
  contrusctAndFilters,
  DirectusCompleteFilter,
  DirectusSingleFilter,
  getStatusFilter,
} from "@/lib/directus/queries/commonFilters";

export const GET_RETOUR_EXPERIENCE_COMPLETE_DATA = (rexFilter?: DirectusCompleteFilter) => `query {
    retour_experience ${rexFilter} {
        titre
        description
        image_principale
        citation
        situation_avant {
            description
            image
        }
        situation_apres {
            description
            image
        }
        solutions {
            solution_retour_experience_id {
                id
                titre
                description
                image
            }
        }
        calendrier
        financement
        difficultes
        partenaires
        ressources
        credits
        types_solution
        echelle
        temporalite
        climat_actuel
        climat_futur
        cout
        porteur
        contact
        odd {
            objectif_developpement_durable_id {
                numero_odd
                description
            }
        }
        retours_experience_lies (sort:"sort")  {
            related_retour_experience_id {
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
}`;

export const GET_RETOUR_EXPERIENCE_CARD_DATA = (rexFilter?: DirectusCompleteFilter) => `query {
    retour_experience ${rexFilter} {
        id
        titre
        image_principale
        climat_actuel
        climat_futur
        types_espace
        region
        slug
    }
}`;

export async function getRetourExperienceBySlug(slug: string): Promise<RetourExperience | null> {
  const filterSlug: DirectusSingleFilter = ` {slug:{_eq: "${slug}"}}`;
  const filter = contrusctAndFilters([getStatusFilter(), filterSlug]);
  const apiResponse = await directusGraphQLCall(GET_RETOUR_EXPERIENCE_COMPLETE_DATA(filter));
  return apiResponse?.retour_experience?.length > 0 ? apiResponse.retour_experience[0] : null;
}

export async function getRetoursExperiences(): Promise<RetourExperience[]> {
  const filter = contrusctAndFilters([getStatusFilter()], "sort");
  const apiResponse = await directusGraphQLCall(GET_RETOUR_EXPERIENCE_CARD_DATA(filter));
  return apiResponse?.retour_experience || [];
}