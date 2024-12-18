"use server";

import { safeReturnStrapiEntities } from "../helpers/strapiArrayUtils";
import { strapiGraphQLCall } from "../strapiClient";
import { APIResponseCollection } from "../types/strapi-custom-types";
import { StrapiFilter } from "./commonStrapiFilters";
import { Webinaire } from "@/src/lib/strapi/types/api/webinaire";

export const GET_WEBINAIRES = async (strapiFilter: StrapiFilter) => `query {
  webinaires ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        titre
        description
        lien_inscription
        jour_evenement
        heure_debut
        heure_fin
        lien_replay
      }
    }
  }
}`;

export async function getAllWebinaires(): Promise<Webinaire[] | []> {
  const filter = new StrapiFilter(true, [], { attribute: "jour_evenement", order: "asc" });
  const apiResponse = (
    await strapiGraphQLCall(await GET_WEBINAIRES(filter), {
      tag: `webinaires`,
    })
  )?.webinaires as APIResponseCollection<Webinaire>;

  return safeReturnStrapiEntities(apiResponse);
}
