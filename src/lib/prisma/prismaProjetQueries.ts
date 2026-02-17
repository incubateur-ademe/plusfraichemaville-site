import { prismaClient } from "@/src/lib/prisma/prismaClient";
import {
  emailStatus,
  emailType,
  FicheType,
  InvitationStatus,
  Prisma,
  projet,
  RoleProjet,
  StatutProjet,
  user_projet,
} from "@/src/generated/prisma/client";
import { ProjetWithPublicRelations, ProjetWithRelations } from "./prismaCustomTypes";
import { generateRandomId } from "@/src/helpers/common";
import { GeoJsonProperties } from "geojson";
import { RexContactId } from "@/src/components/annuaire/types";
import { NiveauMaturiteCode } from "@/src/helpers/maturite-projet";
import { getCommuneSirensForEpci } from "@/src/lib/prisma/prisma-commune-queries";

export const projetWithoutFicheSolution = {
  fiches: { none: { type: FicheType.SOLUTION } },
};

export const projetWithoutFiche = {
  fiches: { none: {} },
};

export const projetNotTermmine = {
  OR: [{ statut: { in: [StatutProjet.en_cours, StatutProjet.besoin_aide] } }, { statut: null }],
};

export const projetWithoutDiagnosticSimulation = {
  diagnostic_simulations: { none: {} },
};

export const projetAdminDidNotAlreadyReceivedEmailAndWantEmail = (emailType: emailType) => ({
  users: {
    some: {
      role: RoleProjet.ADMIN,
      user: { accept_communication_suivi_projet: true },
      email: {
        none: {
          type: emailType,
          email_status: emailStatus.SUCCESS,
        },
      },
    },
  },
});

export const projetIncludes = {
  collectivite: true,
  creator: true,
  estimations: {
    where: { deleted_at: null },
    include: {
      estimations_aides: {
        include: { aide: true },
      },
      estimations_fiches_solutions: {
        include: {
          estimation_materiaux: true,
        },
      },
    },
  },
  users: {
    where: { deleted_at: null },
    include: { user: true },
  },
  fiches: true,
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
              adresse_all_infos: true,
            },
          },
        },
      },
    },
  },
  diagnostic_simulations: true,
};

export const projetPublicSelect = {
  id: true,
  nom: true,
  collectiviteId: true,
  type_espace: true,
  collectivite: true,
  niveau_maturite: true,
  adresse_all_infos: true,
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
          adresse_all_infos: true,
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
  adresse_all_infos,
  dateEcheance,
  typeEspace,
  niveauMaturite,
  userId,
  collectiviteId,
  isPublic,
  budget,
}: {
  projetId?: number;
  nomProjet: string;
  typeEspace: string;
  adresse?: string;
  adresse_all_infos?: GeoJsonProperties;
  dateEcheance: string;
  niveauMaturite: string;
  userId: string;
  collectiviteId: number;
  isPublic: boolean;
  budget?: number;
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
      budget: budget,
      adresse,
      adresse_all_infos: adresse_all_infos as unknown as Prisma.JsonObject,
      niveau_maturite: niveauMaturite,
      date_echeance: new Date(dateEcheance),
      collectiviteId: collectiviteId,
      is_public: isPublic,
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
      budget: budget,
      adresse: adresse ?? null,
      adresse_all_infos: (adresse_all_infos as unknown as Prisma.JsonObject) ?? null,
      niveau_maturite: niveauMaturite,
      date_echeance: new Date(dateEcheance),
      collectiviteId: collectiviteId,
      is_public: isPublic,
    },
    include: projetIncludes,
  });
};

export const deleteProjet = async (projetId: number, userId: string) => {
  return prismaClient.estimation
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

export const getAvailableProjetsForSiren = async (
  siren: string,
  userId: string,
): Promise<ProjetWithPublicRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      creator: {
        siren: siren,
      },
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

export const getAvailableProjetsForEpci = async (
  sirenEpci: string,
  userId: string,
): Promise<ProjetWithPublicRelations[]> => {
  const communeSirens = await getCommuneSirensForEpci(sirenEpci);

  const allSirens = [sirenEpci, ...communeSirens];

  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      creator: {
        siren: {
          in: allSirens,
        },
      },
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
    data: {
      updated_at: new Date(),
    },
  });
};

type GetPublicProjetsParams = {
  excludeProjetId?: number;
};

export const getPublicProjets = async (params?: GetPublicProjetsParams): Promise<ProjetWithPublicRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      is_public: true,
      deleted_at: null,
      ...(params?.excludeProjetId ? { NOT: { id: params.excludeProjetId } } : {}),
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

export const updateSourcingRexProjet = (
  projetId: number,
  sourcingRex: RexContactId[],
): Promise<ProjetWithRelations | null> => {
  return prismaClient.projet.update({
    where: {
      id: projetId,
      deleted_at: null,
    },
    data: {
      sourcing_rex: sourcingRex,
    },
    include: projetIncludes,
  });
};

export const updateProjetVisibility = async (
  projetId: number,
  visible: boolean,
): Promise<ProjetWithRelations | null> => {
  return prismaClient.projet.update({
    where: {
      id: projetId,
      deleted_at: null,
    },
    data: {
      is_public: visible,
    },
    include: projetIncludes,
  });
};

export const updateProjetStatut = async (
  projetId: number,
  statut: StatutProjet,
): Promise<ProjetWithRelations | null> => {
  return prismaClient.projet.update({
    where: {
      id: projetId,
      deleted_at: null,
    },
    data: {
      statut: statut,
      statut_updated_at: new Date(),
    },
    include: projetIncludes,
  });
};

export const getProjetsForRemindToChooseSolution = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      OR: [
        {
          OR: [
            {
              fiches: {
                some: { type: FicheType.DIAGNOSTIC, created_at: { gte: afterDate, lte: beforeDate } },
              },
            },
            {
              diagnostic_simulations: { some: { created_at: { gte: afterDate, lte: beforeDate } } },
            },
          ],
          niveau_maturite: {
            in: [
              NiveauMaturiteCode.questionnement,
              NiveauMaturiteCode.priorisationSolutions,
              NiveauMaturiteCode.redactionCDC,
            ],
          },
        },
        {
          created_at: {
            gte: afterDate,
            lte: beforeDate,
          },
          niveau_maturite: NiveauMaturiteCode.lancementTravaux,
        },
      ],
      AND: [
        { ...projetNotTermmine },
        { ...projetWithoutFicheSolution },
        { ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetRemindToDoSolution) },
      ],
    },
    include: projetIncludes,
  });
};

export const getProjetsForRemindDiagnostic = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      created_at: {
        gte: afterDate,
        lte: beforeDate,
      },
      niveau_maturite: {
        in: [
          NiveauMaturiteCode.questionnement,
          NiveauMaturiteCode.priorisationSolutions,
          NiveauMaturiteCode.redactionCDC,
        ],
      },
      ...projetWithoutFiche,
      ...projetWithoutDiagnosticSimulation,
      ...projetNotTermmine,
      ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetRemindToDoDiagnostic),
    },
    include: projetIncludes,
  });
};

export const getProjetsForRemindDiagnosticEmail = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      diagnostic_simulations: {
        some: {
          validated: false,
          updated_at: {
            gte: afterDate,
            lte: beforeDate,
          },
        },
      },
      AND: [
        { ...projetNotTermmine },
        { ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.remindNotCompletedDiagnostic) },
      ],
    },
    include: projetIncludes,
  });
};

export const getProjetsForRemindToDoEstimation = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      fiches: {
        some: { type: FicheType.SOLUTION, created_at: { gte: afterDate, lte: beforeDate } },
        none: { type: FicheType.SOLUTION, created_at: { gte: beforeDate } },
      },
      estimations: { none: { deleted_at: null } },
      AND: [
        { ...projetNotTermmine },
        { ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetRemindToDoEstimation) },
      ],
    },
    include: projetIncludes,
  });
};

export const getProjetsForRemindToDoFinancement = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      estimations: {
        some: {
          deleted_at: null,
          created_at: { gte: afterDate, lte: beforeDate },
          estimations_aides: {
            none: {},
          },
        },
        none: {
          deleted_at: null,
          OR: [
            { created_at: { gte: beforeDate } },
            {
              estimations_aides: {
                some: {},
              },
            },
          ],
        },
      },
      AND: [
        { ...projetNotTermmine },
        { ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetRemindToDoFinancement) },
      ],
    },
    include: projetIncludes,
  });
};

export const getProjetsUnfinishedAndLastUpdatedBetween = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      updated_at: { gte: afterDate, lte: beforeDate },
      AND: [
        { ...projetNotTermmine },
        { ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetUnfinishedInactive) },
      ],
    },
    include: projetIncludes,
  });
};

export const getProjetsUnfinishedAndLastUpdatedBetween2 = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      updated_at: { gte: afterDate, lte: beforeDate },
      OR: [{ statut: null }, { statut: StatutProjet.en_cours }],
      ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetUnfinishedInactive2),
    },
    include: projetIncludes,
  });
};

export const getProjetsFinishedToGetRex = async (afterDate: Date, beforeDate: Date): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      statut_updated_at: { gte: afterDate, lte: beforeDate },
      statut: StatutProjet.termine,
      ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetFinishedToGetRex),
    },
    include: projetIncludes,
  });
};

export const getProjetsFinishedToGetQuestionnaire = async (
  afterDate: Date,
  beforeDate: Date,
): Promise<ProjetWithRelations[]> => {
  return prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      statut_updated_at: { gte: afterDate, lte: beforeDate },
      statut: StatutProjet.termine,
      ...projetAdminDidNotAlreadyReceivedEmailAndWantEmail(emailType.projetFinishedQuestionnaireSatisfaction),
    },
    include: projetIncludes,
  });
};
