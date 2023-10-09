import "server-only";

import { directusClient } from "@/lib/directus/directusClient";
import { readItems } from "@directus/sdk";

export async function getFichesTechniques() {
  try {
    const statusToShow = (process.env.DIRECTUS_FICHES_TECHNIQUES_SHOW_STATUSES || "published").split(",");
    return await directusClient.request(
      readItems("fiche_technique", {
        fields: ["id", "titre", "status"],
        filter: { status: { _in: statusToShow } },
      }),
    );
  } catch (err) {
    console.log("ERROR in getFichesTechniques ", err);
  }
  return [];
}
