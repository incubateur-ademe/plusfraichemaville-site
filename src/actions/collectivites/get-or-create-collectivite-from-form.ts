import { fetchCommuneFromBanApi, fetchCommuneFromBanApiWithRetry } from "@/src/lib/adresseApi/fetch";
import {
  createCollectiviteByName,
  createCollectiviteFromCommune,
  getCollectiviteByCodeInsee,
  getCollectiviteById,
  getOrCreateCollectivite,
  updateCollectiviteWithBanInfo,
} from "@/src/lib/prisma/prismaCollectiviteQueries";
import { getCommuneByInsee } from "@/src/lib/prisma/prisma-commune-queries";
import { CollectiviteFormData } from "@/src/forms/commune/collectivite-form-schema";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { AddressCommune } from "@/src/lib/adresseApi/types";
import { collectivite } from "@/src/generated/prisma/client";

const completeCollectiviteWithBanInfo = async (collectivite: collectivite, banAddress?: AddressCommune) => {
  if (collectivite.code_postal || !collectivite.code_insee) {
    return;
  }
  try {
    const addressToUse =
      banAddress ??
      (await fetchCommuneFromBanApi(collectivite.nom, 20)).find(
        (address) => address.codeInsee === collectivite.code_insee,
      );
    if (addressToUse) {
      await updateCollectiviteWithBanInfo(collectivite.id, addressToUse);
    }
  } catch (e) {
    customCaptureException(`Error when completing collectivite ${collectivite.id} with BAN info`, e);
  }
};

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
  if (data.id) {
    const existingCollectivite = await getCollectiviteById(data.id);
    if (existingCollectivite) {
      await completeCollectiviteWithBanInfo(existingCollectivite);
    }
    return data.id;
  }
  const entitiesFromBan = await fetchCommuneFromBanApiWithRetry(data.nomCommune, 20);
  const collectiviteToUse = entitiesFromBan.find((address) => address.banId === data.banId);
  if (!collectiviteToUse) {
    captureError(`Could not retrieve adresse info for collectivite ${data.nomCommune} ${data.banId}`, data);
    return (await findOrCreateCollectiviteWithoutBan(data, userId)).id;
  }
  const collectivite = await getOrCreateCollectivite(collectiviteToUse, userId);
  await completeCollectiviteWithBanInfo(collectivite, collectiviteToUse);
  return collectivite.id;
};
