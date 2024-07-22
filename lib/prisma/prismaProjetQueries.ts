import { prismaClient } from "@/lib/prisma/prismaClient";
import { Prisma, projet, user_projet } from "@prisma/client";
import { ProjetWithRelations } from "./prismaCustomTypes";
import { generateRandomId } from "@/helpers/common";
import { GeoJsonProperties } from "geojson";

const projetIncludes = {
  collectivite: true,
  creator: true,
  estimations: {
    where: { deleted_at: null },
    include: {
      estimations_aides: {
        include: {
          aide: true,
        },
      },
    },
  },
  users: {
    include: {
      user: true,
    },
  },
};

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
      recommandations_viewed_by: updatedRecommandationsViewed,
    },
    include: projetIncludes,
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
      recommandations_viewed_by: updatedRecommandationsViewed,
    },
    include: projetIncludes,
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
    include: projetIncludes,
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
    include: projetIncludes,
  });
};

export const getProjetById = async (projetId: number): Promise<projet | null> => {
  return prismaClient.projet.findUnique({
    where: {
      id: projetId,
      deleted_at: null,
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
  return prismaClient.$transaction(async (tx) => {
    const projet = await tx.projet.upsert({
      where: {
        id: projetId ?? -1,
        deleted_at: null,
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
      include: projetIncludes,
    });

    if (!projetId) {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        return null;
      }

      await tx.user_projet.create({
        data: {
          email_address: user.email,
          role: "ADMIN",
          projet_id: projet.id,
          user_id: userId,
          invitation_status: "ACCEPTED",
        },
      });
    }

    return projet;
  });
};

export const deleteProjet = async (projetId: number, userId: string) => {
  prismaClient.estimation
    .updateMany({
      where: {
        projet_id: projetId,
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
        deleted_by: userId,
      },
    })
    .then(() =>
      prismaClient.projet.update({
        where: {
          id: projetId,
          deleted_at: null,
        },
        data: {
          deleted_at: new Date(),
          deleted_by: userId,
        },
      }),
    );
};

export const getUserProjets = async (userId: string) => {
  return prismaClient.projet.findMany({
    where: {
      OR: [
        { created_by: userId },
        {
          users: {
            some: {
              user_id: userId,
              deleted_at: null,
              invitation_status: { in: ["ACCEPTED", "REQUESTED", "INVITED"] },
            },
          },
        },
      ],
      deleted_at: null,
    },
    include: {
      ...projetIncludes,
      users: {
        where: {
          deleted_at: null,
          invitation_status: { in: ["ACCEPTED", "REQUESTED", "INVITED"] },
        },
        include: {
          user: true,
        },
      },
    },
  });
};

export const leaveProject = async (userId: string, projectId: number): Promise<user_projet | null> => {
  return prismaClient.$transaction(async (tx) => {
    const user = await tx.user_projet.findUnique({
      where: {
        user_id_projet_id: {
          user_id: userId,
          projet_id: projectId,
        },
      },
    });

    if (!user) {
      return null;
    }

    if (user.role === "ADMIN") {
      const adminCount = await tx.user_projet.count({
        where: {
          projet_id: projectId,
          role: "ADMIN",
          invitation_status: "ACCEPTED",
        },
      });

      if (adminCount < 2) {
        return null;
      }
    }

    const updatedUser = await tx.user_projet.update({
      where: {
        user_id_projet_id: {
          user_id: userId,
          projet_id: projectId,
        },
      },
      data: {
        invitation_status: "DECLINED",
        deleted_at: new Date(),
        deleted_by: userId,
      },
    });

    return updatedUser;
  });
};
