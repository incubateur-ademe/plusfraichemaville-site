import { prismaClient } from "@/lib/prisma/prismaClient";
import { Prisma, projet } from "@prisma/client";
import { ProjetWithRelations } from "./prismaCustomTypes";
import { generateRandomId } from "@/helpers/common";
import { GeoJsonProperties } from "geojson";

export const updateFichesProjet = async (
  projetId: number,
  ficheId: number,
  userId: string,
  type: "solution" | "diagnostic",
): Promise<ProjetWithRelations | null> => {
  const projet = await getProjetById(projetId);
  const selectedFichesInProjet = type === "solution" ? projet?.fiches_solutions_id : projet?.fiches_diagnostic_id;
  const recommandationsViewedUserIds = projet?.recommandations_viewed_by;
  let updatedRecommandationsViewed: string[] = [];

  if (recommandationsViewedUserIds) {
    updatedRecommandationsViewed = recommandationsViewedUserIds.filter((currentUserId) => currentUserId !== userId);
  }

  const isAlreadySaved = selectedFichesInProjet?.includes(+ficheId);
  const fichesUpdated = isAlreadySaved
    ? selectedFichesInProjet?.filter((currentFicheId) => currentFicheId !== +ficheId)
    : selectedFichesInProjet && Array.from(new Set([...selectedFichesInProjet, +ficheId]));

  return prismaClient.projet.update({
    where: {
      id: projetId,
    },
    data: {
      fiches_solutions_id: type === "solution" ? fichesUpdated : projet?.fiches_solutions_id,
      fiches_diagnostic_id: type === "diagnostic" ? fichesUpdated : projet?.fiches_diagnostic_id,
      fiches_solutions_validated: false,
      recommandations_viewed_by: updatedRecommandationsViewed,
    },
    include: {
      collectivite: true,
      estimations: true,
      creator: true,
    },
  });
};

export const updateFichesSolutionsProjet = async (
  projetId: number,
  fichesSolutionsId: number[],
  userId: string,
): Promise<ProjetWithRelations | null> => {
  const projet = await getProjetById(projetId);
  const recommandationsViewedUserIds = projet?.recommandations_viewed_by;
  let updatedRecommandationsViewed: string[] = [];

  if (recommandationsViewedUserIds) {
    updatedRecommandationsViewed = recommandationsViewedUserIds.filter((currentUserId) => currentUserId !== userId);
  }

  return prismaClient.projet.update({
    where: {
      id: projetId,
    },
    data: {
      fiches_solutions_id: fichesSolutionsId,
      fiches_solutions_validated: false,
      recommandations_viewed_by: updatedRecommandationsViewed,
    },
    include: {
      collectivite: true,
      estimations: true,
      creator: true,
    },
  });
};

export const addRecommandationsViewedBy = async (projetId: number, userId: string) => {
  const projet = await getProjetById(projetId);
  const recommandationsViewedUserIds = projet?.recommandations_viewed_by;
  let updatedRecommandationsViewed: string[] = [];
  if (recommandationsViewedUserIds) {
    updatedRecommandationsViewed = [...recommandationsViewedUserIds, userId];
  }

  return prismaClient.projet.update({
    where: { id: projetId },
    data: {
      recommandations_viewed_by: updatedRecommandationsViewed,
    },
    include: {
      collectivite: true,
      creator: true,
      estimations: true,
    },
  });
};

export const deleteRecommandationsViewedBy = async (projetId: number, userId: string) => {
  const projet = await getProjetById(projetId);
  const recommandationsViewedUserIds = projet?.recommandations_viewed_by;
  let updatedRecommandationsViewed: string[] = [];

  if (recommandationsViewedUserIds) {
    updatedRecommandationsViewed = recommandationsViewedUserIds.filter((currentUserId) => currentUserId !== userId);
  }

  return prismaClient.projet.update({
    where: { id: projetId },
    data: {
      recommandations_viewed_by: updatedRecommandationsViewed,
    },
    include: {
      collectivite: true,
      creator: true,
      estimations: true,
    },
  });
};

export const updateFichesSolutionsProjetValidated = (projetId: number): Promise<ProjetWithRelations | null> => {
  return prismaClient.projet.update({
    where: {
      id: projetId,
    },
    data: {
      fiches_solutions_validated: true,
    },
    include: {
      collectivite: true,
      creator: true,
      estimations: true,
    },
  });
};

export const getProjetById = async (projetId: number): Promise<projet | null> => {
  return prismaClient.projet.findUnique({
    where: {
      id: projetId,
    },
  });
};

export const createOrUpdateProjet = async ({
  projetId,
  nomProjet,
  adresse,
  adresse_info,
  dateEcheance,
  typeEspace,
  niveauMaturite,
  userId,
  collectiviteId,
}: {
  projetId?: number;
  nomProjet: string;
  typeEspace: string;
  adresse?: string;
  adresse_info?: GeoJsonProperties;
  dateEcheance: string;
  niveauMaturite: string;
  userId: string;
  collectiviteId: number;
}) => {
  return prismaClient.projet.upsert({
    where: {
      id: projetId ?? -1,
    },
    create: {
      id: generateRandomId(),
      created_by: userId,
      nom: nomProjet,
      type_espace: typeEspace,
      adresse,
      adresse_info: adresse_info as Prisma.JsonObject,
      niveau_maturite: niveauMaturite,
      date_echeance: new Date(dateEcheance),
      collectiviteId: collectiviteId,
    },
    update: {
      nom: nomProjet,
      type_espace: typeEspace,
      adresse: adresse ?? null,
      adresse_info: (adresse_info as Prisma.JsonObject) ?? null,
      niveau_maturite: niveauMaturite,
      date_echeance: new Date(dateEcheance),
      collectiviteId: collectiviteId,
    },
    include: {
      collectivite: true,
      estimations: true,
      creator: true,
    },
  });
};
