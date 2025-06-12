"use server";

import { safeReturnStrapiEntities } from "../helpers/strapiArrayUtils";
import { strapiGraphQLCall } from "../strapiClient";
import { APIResponseCollection } from "../types/strapi-custom-types";
import { StrapiFilter } from "./commonStrapiFilters";
import { Evenement } from "@/src/lib/strapi/types/api/evenement";
import { STRAPI_IMAGE_FRAGMENT } from "@/src/lib/strapi/queries/strapiFragments";

export const GET_EVENEMENTS = async (strapiFilter: StrapiFilter) => ` ${STRAPI_IMAGE_FRAGMENT} query {
  evenements ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        image_principale {
          ...ImageInfo
        }
        description
        type
        bouton_texte
        bouton_lien
        rank
        date_fin
      }
    }
  }
}`;

export async function getAllEvenements(): Promise<Evenement[] | []> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (
    await strapiGraphQLCall(await GET_EVENEMENTS(filter), {
      tag: `evenements`,
    })
  )?.evenements as APIResponseCollection<Evenement>;

  return safeReturnStrapiEntities(apiResponse);
}
