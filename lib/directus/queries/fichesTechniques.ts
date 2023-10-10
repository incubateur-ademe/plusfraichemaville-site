import "server-only";

import { directusGraphQLCall } from "@/lib/directus/directusClient";
import { FicheTechnique } from "@/lib/directus/directusModels";

export const GET_ALL_FICHES_TECHNIQUES_QUERY = (filterStatus?: string) => `query {
    fiche_technique ${filterStatus} {
        id
        titre
        status
    }
}`;

export async function getFichesTechniques(): Promise<FicheTechnique[]> {
  const statusToShow = (process.env.DIRECTUS_FICHES_TECHNIQUES_SHOW_STATUSES || "published")
    .split(",")
    .map((s) => '"' + s + '"');
  const filterStatus = ` (filter: {status:{_in: [${statusToShow}]}})`;
  try {
    const apiResponse = await directusGraphQLCall(GET_ALL_FICHES_TECHNIQUES_QUERY(filterStatus));
    return apiResponse.fiche_technique;
  } catch (err) {
    console.log("ERROR in getFichesTechniques ", err);
  }
  return [];
}
