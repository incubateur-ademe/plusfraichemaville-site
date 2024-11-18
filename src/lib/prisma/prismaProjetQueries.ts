import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { InvitationStatus, Prisma, projet, RoleProjet, user_projet } from "@prisma/client";
import { ProjetWithPublicRelations, ProjetWithRelations } from "./prismaCustomTypes";
import { generateRandomId } from "@/src/helpers/common";
import { GeoJsonProperties } from "geojson";
import { RexContactId } from "@/src/components/sourcing/types";

export const projetIncludes = {
  collectivite: true,
  creator: true,
  estimations: {
    where: { deleted_at: null },
    include: {
      estimations_aides: {
        include: { aide: true },
      },
    },
  },
  users: {
    where: { deleted_at: null },
    include: { user: true },
  },
  sourcing_user_projets: {
    include: {
      sourced_user_projet: {
        include: {
          user: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              email: true,
              poste: true,
              nom_etablissement: true,
            },
          },
          projet: {
            select: {
              collectivite: true,
              nom: true,
              type_espace: true,
              niveau_maturite: true,
              adresse_info: true,
            },
          },
        },
      },
    },
  },
};

export const projetPublicSelect = {
  id: true,
  nom: true,
  collectiviteId: true,
  type_espace: true,
  collectivite: true,
  niveau_maturite: true,
  adresse_info: true,
  users: {
    select: {
      id: true,
      user: { select: { id: true, nom: true, prenom: true, email: true, poste: true, nom_etablissement: true } },
      projet: {
        select: {
          collectivite: true,
          nom: true,
          type_espace: true,
          niveau_maturite: true,
          adresse_info: true,
        },
      },
      created_at: true,
      role: true,
      invitation_status: true,
      user_id: true,
      nb_views: true,
    },
  },
  sourcing_user_projets: { include: { sourced_user_projet: { include: { user: true } } } },
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

export const getProjetWithPublicRelationsById = async (projetId: number): Promise<ProjetWithPublicRelations | null> => {
  return prismaClient.projet.findUnique({
    where: {
      id: projetId,
      deleted_at: null,
    },
    select: projetPublicSelect,
  });
};

export const getProjetWithRelationsById = async (projetId: number): Promise<ProjetWithRelations | null> => {
  return prismaClient.projet.findUnique({
    where: {
      id: projetId,
      deleted_at: null,
    },
    include: projetIncludes,
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
      users: {
        create: {
          user_id: userId,
          role: RoleProjet.ADMIN,
          invitation_status: InvitationStatus.ACCEPTED,
          invitation_token: null,
          nb_views: 1,
          last_viewed_at: new Date(),
        },
      },
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

export const getPendingUserProjets = async (userId: string): Promise<ProjetWithPublicRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      users: {
        some: {
          user_id: userId,
          deleted_at: null,
          invitation_status: { in: [InvitationStatus.REQUESTED, InvitationStatus.INVITED] },
        },
      },
      deleted_at: null,
    },
    select: projetPublicSelect,
  });
};

export const getUserProjets = async (userId: string): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      users: {
        some: {
          user_id: userId,
          deleted_at: null,
          invitation_status: { in: [InvitationStatus.ACCEPTED] },
        },
      },
      deleted_at: null,
    },
    include: {
      ...projetIncludes,
    },
  });
};

export const leaveProject = async (userId: string, projectId: number): Promise<user_projet | null> => {
  return prismaClient.user_projet.update({
    where: {
      user_id_projet_id: {
        user_id: userId,
        projet_id: projectId,
      },
      deleted_at: null,
    },
    data: {
      deleted_at: new Date(),
      deleted_by: userId,
    },
  });
};

export const getAvailableProjectsForCollectivite = async (
  collectiviteId: number,
  userId: string,
): Promise<ProjetWithPublicRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      collectiviteId,
      deleted_at: null,
      NOT: {
        users: {
          some: {
            user_id: userId,
            invitation_status: InvitationStatus.ACCEPTED,
            deleted_at: null,
          },
        },
      },
    },
    select: projetPublicSelect,
  });
};

export const updateMaturiteProjet = (projetId: number, niveauMaturite: string) => {
  return prismaClient.projet.update({
    where: {
      id: projetId,
    },
    data: {
      niveau_maturite: niveauMaturite,
    },
    include: projetIncludes,
  });
};

export const projetUpdated = async (projetId: number): Promise<projet | null> => {
  return prismaClient.projet.update({
    where: {
      id: projetId,
      deleted_at: null,
    },
    data: {},
  });
};

export const getPublicProjets = async (): Promise<ProjetWithPublicRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      is_public: true,
      deleted_at: null,
    },
    select: projetPublicSelect,
  });
};

export const getPublicProjetById = async (projetId: number): Promise<ProjetWithPublicRelations | null> => {
  return prismaClient.projet.findUnique({
    where: {
      id: projetId,
      is_public: true,
      deleted_at: null,
    },
    select: projetPublicSelect,
  });
};

export const updateSourcingCmsProjet = (
  projetId: number,
  sourcingCms: RexContactId[],
): Promise<ProjetWithRelations | null> => {
  return prismaClient.projet.update({
    where: {
      id: projetId,
      deleted_at: null,
    },
    data: {
      sourcing_cms: sourcingCms,
    },
    include: projetIncludes,
  });
};
