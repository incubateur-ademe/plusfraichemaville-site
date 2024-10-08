import { fetchCollectiviteFromBanApi } from "@/src/lib/adresseApi/fetch";
import { createCollectiviteByName, getOrCreateCollectivite } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { CollectiviteFormData } from "@/src/forms/collectivite/collectivite-form-schema";

export const getOrCreateCollectiviteFromForm = async (data: CollectiviteFormData, userId: string) => {
  let collectiviteId = data.id;
  if (!collectiviteId) {
    const entitiesFromBan = await fetchCollectiviteFromBanApi(data.nomCollectivite, 50);
    let collectiviteToUse = entitiesFromBan.find((address) => address.banId === data.banId);
    const collectivite = collectiviteToUse
      ? await getOrCreateCollectivite(collectiviteToUse, userId)
      : await createCollectiviteByName(data.nomCollectivite, userId);
    collectiviteId = collectivite.id;
  }
  return collectiviteId;
};
