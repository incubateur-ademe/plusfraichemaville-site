import { fetchCommuneFromBanApi } from "@/src/lib/adresseApi/fetch";
import { createCollectiviteByName, getOrCreateCollectivite } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { CollectiviteFormData } from "@/src/forms/commune/collectivite-form-schema";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";

export const getOrCreateCollectiviteFromForm = async (data: CollectiviteFormData, userId: string) => {
  let collectiviteId = data.id;
  if (!collectiviteId) {
    const entitiesFromBan = await fetchCommuneFromBanApi(data.nomCommune, 20);
    const collectiviteToUse = entitiesFromBan.find((address) => address.banId === data.banId);
    if (!collectiviteToUse) {
      captureError(`Could not retrieve adresse info for collectivite ${data.nomCommune} ${data.banId}`, data);
    }
    const collectivite = collectiviteToUse
      ? await getOrCreateCollectivite(collectiviteToUse, userId)
      : await createCollectiviteByName(data.nomCommune, userId);
    collectiviteId = collectivite.id;
  }
  return collectiviteId;
};
