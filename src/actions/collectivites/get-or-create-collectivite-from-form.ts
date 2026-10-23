import { fetchCommuneFromBanApiWithRetry } from "@/src/lib/adresseApi/fetch";
import {
  createCollectiviteByName,
  createCollectiviteFromCommune,
  getCollectiviteByCodeInsee,
  getOrCreateCollectivite,
} from "@/src/lib/prisma/prismaCollectiviteQueries";
import { getCommuneByInsee } from "@/src/lib/prisma/prisma-commune-queries";
import { CollectiviteFormData } from "@/src/forms/commune/collectivite-form-schema";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";

const findOrCreateCollectiviteWithoutBan = async (data: CollectiviteFormData, userId: string) => {
  if (data.codeInsee) {
    const existingCollectivite = await getCollectiviteByCodeInsee(data.codeInsee);
    if (existingCollectivite) {
      return existingCollectivite;
    }
    const commune = await getCommuneByInsee(data.codeInsee);
    if (commune) {
      return createCollectiviteFromCommune(commune, userId);
    }
  }
  captureError(`Could not find collectivite or commune in DB for ${data.nomCommune} ${data.codeInsee}`, data);
  return createCollectiviteByName(data.nomCommune, userId);
};

export const getOrCreateCollectiviteFromForm = async (data: CollectiviteFormData, userId: string) => {
  let collectiviteId = data.id;
  if (!collectiviteId) {
    const entitiesFromBan = await fetchCommuneFromBanApiWithRetry(data.nomCommune, 20);
    const collectiviteToUse = entitiesFromBan.find((address) => address.banId === data.banId);
    if (!collectiviteToUse) {
      captureError(`Could not retrieve adresse info for collectivite ${data.nomCommune} ${data.banId}`, data);
    }
    const collectivite = collectiviteToUse
      ? await getOrCreateCollectivite(collectiviteToUse, userId)
      : await findOrCreateCollectiviteWithoutBan(data, userId);
    collectiviteId = collectivite.id;
  }
  return collectiviteId;
};
