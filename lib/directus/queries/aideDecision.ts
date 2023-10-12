import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { TypeEspace } from "@/lib/directus/directusModels";

export const GET_ALL_TYPE_ESPACE_QUERY = `query {
    type_espace {
        id
        nom
        icone
        sort
        question_suivante
    }
}`;

export async function getAllTypeEspace(): Promise<TypeEspace[]> {
  try {
    const apiResponse = await directusGraphQLCall(GET_ALL_TYPE_ESPACE_QUERY);
    return apiResponse.type_espace;
  } catch (err) {
    console.log("ERROR in getFichesTechniques ", err);
  }
  return [];
}
