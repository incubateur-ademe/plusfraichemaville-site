import { fetchCollectiviteFromBanApi } from "@/src/lib/adresseApi/fetch";
import { createCollectiviteByName, getOrCreateCollectivite } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { CollectiviteFormData } from "@/src/forms/collectivite/collectivite-form-schema";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";

export const getOrCreateCollectiviteFromForm = async (data: CollectiviteFormData, userId: string) => {
  let collectiviteId = data.id;
  if (!collectiviteId) {
    const entitiesFromBan = await fetchCollectiviteFromBanApi(data.nomCollectivite, 20);
    let collectiviteToUse = entitiesFromBan.find((address) => address.banId === data.banId);
    if (!collectiviteToUse) {
      captureError(`Could not retrieve adresse info for collectivite ${data.nomCollectivite} ${data.banId}`, data);
    }
    const collectivite = collectiviteToUse
      ? await getOrCreateCollectivite(collectiviteToUse, userId)
      : await createCollectiviteByName(data.nomCollectivite, userId);
    collectiviteId = collectivite.id;
  }
  return collectiviteId;
};
