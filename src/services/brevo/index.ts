import {
  createEmail,
  getUserWithNoActivityAfterSignup,
  updateEmailStatus as updateEmailStatusQuery,
} from "@/src/lib/prisma/prisma-email-queries";
import { email, emailStatus, emailType, FicheType, RoleProjet } from "@/src/generated/prisma/client";
import { brevoSendEmail } from "./brevo-api";
import { ResponseAction } from "@/src/actions/actions-types";
import { getOldestProjectAdmin } from "@/src/lib/prisma/prisma-user-projet-queries";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations, UserProjetWithRelations, UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { getPrimaryCollectiviteForUser } from "@/src/helpers/user";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import {
  getProjetsFinishedToGetQuestionnaire,
  getProjetsFinishedToGetRex,
  getProjetsForRemindDiagnostic,
  getProjetsForRemindDiagnosticEmail,
  getProjetsForRemindToChooseSolution,
  getProjetsForRemindToDoEstimation,
  getProjetsForRemindToDoFinancement,
  getProjetsUnfinishedAndLastUpdatedBetween,
  getProjetsUnfinishedAndLastUpdatedBetween2,
} from "@/src/lib/prisma/prismaProjetQueries";
import { removeDaysToDate } from "@/src/helpers/dateUtils";
import { getCountAllUsers, getUserById } from "@/src/lib/prisma/prismaUserQueries";
import { selectEspaceByCode } from "@/src/helpers/type-espace-filter";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { UserInfoFormData } from "@/src/forms/user/UserInfoFormSchema";

interface Templates {
  templateId: number;
}

type EmailSendResult = ResponseAction<{ email?: email }>;

export type EmailRemindToDoDiagnosticConfig = {
  projetName: string;
  userPrenom: string;
  typeEspaceProjet: string;
  urlModule2: string;
};

export type EmailRemindChooseSolutionConfig = {
  projetName: string;
  userPrenom: string;
  typeEspaceProjet: string;
  urlModule3: string;
};

export type EmailRemindDoEstimationConfig = {
  projetName: string;
  userPrenom: string;
  nomSolution1?: string;
  nomSolution2?: string;
  nomSolution3?: string;
  plusDeTroisSolutions: boolean;
  urlModule4: string;
};

export type EmailRemindFindFinancementConfig = {
  projetName: string;
  userPrenom: string;
  typeEspaceProjet: string;
  urlModule5: string;
};

export type EmailRemindUnfinishedAndInactiveProjetConfig = {
  userPrenom: string;
  urlProjetStatus: string;
};

export type EmailRemindUnfinishedAndInactiveProjet2Config = {
  userPrenom: string;
  projetName: string;
  urlTableauDeBord: string;
};

export type EmailProjetPartageConfig = {
  username: string;
  userCollectiviteName: string;
  projetName: string;
  projetCollectiviteName: string;
  link: string;
  destinationMail: string;
};

const computeRemindToDoEstimationEmailParam = (
  projet: ProjetWithRelations,
  allFichesSolutions: FicheSolution[],
): EmailRemindDoEstimationConfig => {
  const chosenFichesSolutions = projet.fiches.filter((fiche) => fiche.type === FicheType.SOLUTION);
  return {
    projetName: projet.nom,
    userPrenom: projet.creator.prenom || "",
    ...(chosenFichesSolutions[0] && {
      nomSolution1: allFichesSolutions.find((fs) => fs.id == chosenFichesSolutions[0].fiche_id)?.attributes.titre,
    }),
    ...(chosenFichesSolutions[1] && {
      nomSolution2: allFichesSolutions.find((fs) => fs.id == chosenFichesSolutions[1].fiche_id)?.attributes.titre,
    }),
    ...(chosenFichesSolutions[2] && {
      nomSolution3: allFichesSolutions.find((fs) => fs.id == chosenFichesSolutions[2].fiche_id)?.attributes.titre,
    }),
    plusDeTroisSolutions: chosenFichesSolutions.length > 3,
    urlModule4: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_CREATION_ESTIMATION(projet.id)),
  };
};

export class EmailService {
  private readonly templates: Record<emailType, Templates>;

  constructor() {
    this.templates = {
      projetInvitation: {
        templateId: 38,
      },
      projetRequestAccess: {
        templateId: 39,
      },
      projetAccessGranted: {
        templateId: 42,
      },
      projetAccessDeclined: {
        templateId: 44,
      },
      contactMessageSent: {
        templateId: 45,
      },
      welcomeMessage: {
        templateId: 52,
      },
      welcomeMessageV2: {
        templateId: 62,
      },
      projetCreation: {
        templateId: 54,
      },
      noActivityAfterSignup: {
        templateId: 53,
      },
      remindNotCompletedDiagnostic: {
        templateId: 60,
      },
      projetRemindToDoDiagnostic: {
        templateId: 63,
      },
      projetRemindToDoSolution: {
        templateId: 64,
      },
      projetRemindToDoEstimation: {
        templateId: 65,
      },
      projetRemindToDoFinancement: {
        templateId: 66,
      },
      projetUnfinishedInactive: {
        templateId: 71,
      },
      noProjetAfterSignupMail1: {
        templateId: 67,
      },
      noProjetAfterSignupMail2: {
        templateId: 69,
      },
      noProjetAfterSignupMail3: {
        templateId: 70,
      },
      projetFinishedToGetRex: {
        templateId: 73,
      },
      projetFinishedQuestionnaireSatisfaction: {
        templateId: 72,
      },
      projetUnfinishedInactive2: {
        templateId: 74,
      },
    };
  }

  private async updateEmailStatus(id: string, status: emailStatus, brevoId?: string): Promise<email> {
    return updateEmailStatusQuery(id, status, brevoId);
  }

  private async sendEmail({
    to,
    emailType,
    params,
    userProjetId,
    extra,
    userId,
  }: {
    to: string;
    emailType: emailType;
    params?: Record<string, string | boolean>;
    userProjetId?: number;
    userId?: string;
    extra?: any;
  }): Promise<EmailSendResult> {
    const { templateId } = this.templates[emailType];
    const dbEmail = await createEmail({ to, emailType, userProjetId, userId, extra });

    try {
      const response = await brevoSendEmail(to, templateId, {
        ...params,
        communicationSettingsUrl: getFullUrl(PFMV_ROUTES.PREFERENCES_COMMUNICATION),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`Erreur avec l'API Brevo : ${JSON.stringify(data)}`);
      }

      const data = await response.json();

      const email = await this.updateEmailStatus(dbEmail.id, emailStatus.SUCCESS, data.messageId);

      return { type: "success", message: "EMAIL_SENT", email };
    } catch (error) {
      captureError("Erreur lors de l'envoi du mail : ", error);
      await this.updateEmailStatus(dbEmail.id, emailStatus.ERROR);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }

  async sendInvitationEmail(
    email: string,
    userProjet: UserProjetWithRelations,
    actionInitiatorUser: UserWithCollectivite,
  ): Promise<EmailSendResult> {
    const params: EmailProjetPartageConfig = {
      username: `${actionInitiatorUser.prenom} ${actionInitiatorUser.nom}`,
      projetCollectiviteName: userProjet.projet.collectivite.nom,
      userCollectiviteName: getPrimaryCollectiviteForUser(actionInitiatorUser).nom,
      destinationMail: email,
      projetName: userProjet.projet.nom,
      link: `${process.env.NEXT_PUBLIC_URL_SITE}${PFMV_ROUTES.ESPACE_PROJET_WITH_CURRENT_TAB(
        "invitation",
      )}&invitation_token=${userProjet.invitation_token}&invitation_id=${userProjet.id}`,
    };

    return this.sendEmail({
      to: email,
      emailType: emailType.projetInvitation,
      params: params,
      userProjetId: userProjet.id,
    });
  }

  async sendResponseRequestAccessEmail(
    email: string,
    userProjet: UserProjetWithRelations,
    actionInitiatorUser: UserWithCollectivite,
    accessGranted: boolean,
  ): Promise<EmailSendResult> {
    const params: EmailProjetPartageConfig = {
      username: `${actionInitiatorUser.prenom} ${actionInitiatorUser.nom}`,
      projetCollectiviteName: userProjet.projet.collectivite.nom,
      userCollectiviteName: getPrimaryCollectiviteForUser(actionInitiatorUser).nom,
      destinationMail: email,
      projetName: userProjet.projet.nom,
      link: `${process.env.NEXT_PUBLIC_URL_SITE}${PFMV_ROUTES.ESPACE_PROJET}`,
    };
    const template = accessGranted ? emailType.projetAccessGranted : emailType.projetAccessDeclined;

    return this.sendEmail({ to: email, emailType: template, params: params, userProjetId: userProjet.id });
  }

  async sendRequestAccessEmail(userProjet: UserProjetWithRelations) {
    if (!userProjet.user) {
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
    const oldestAdmin = await getOldestProjectAdmin(userProjet.projet_id);
    if (oldestAdmin && oldestAdmin.user?.email) {
      const params: EmailProjetPartageConfig = {
        username: `${userProjet.user.prenom} ${userProjet.user.nom}`,
        projetCollectiviteName: userProjet.projet.collectivite.nom,
        userCollectiviteName: getPrimaryCollectiviteForUser(userProjet.user).nom,
        destinationMail: oldestAdmin.user.email,
        projetName: userProjet.projet.nom,
        link: `${process.env.NEXT_PUBLIC_URL_SITE}${PFMV_ROUTES.ESPACE_PROJET_UTILISATEURS_PROJET(
          userProjet.projet_id,
        )}`,
      };

      return this.sendEmail({
        to: oldestAdmin.user.email,
        emailType: emailType.projetRequestAccess,
        userProjetId: userProjet.id,
        params: params,
      });
    }
    return { type: "error", message: "ADMIN_NOT_FOUND" };
  }

  async sendWelcomeMessageEmail(data: Pick<UserInfoFormData, "email" | "nom"> & { nomCollectivite?: string }) {
    return this.sendEmail({
      to: data.email,
      emailType: emailType.welcomeMessageV2,
    });
  }

  async sendRemindDoDiagnosticMail(lastSyncDate: Date) {
    const projets = await getProjetsForRemindDiagnostic(lastSyncDate, new Date());
    console.log(`Nb de mails de projet avec le module Diagnostic à faire : ${projets.length}`);
    return await Promise.all(
      projets.map(async (projet) => {
        const emailParams: EmailRemindToDoDiagnosticConfig = {
          userPrenom: projet.creator.prenom || "",
          projetName: projet.nom,
          typeEspaceProjet: selectEspaceByCode(projet.type_espace)?.label || "",
          urlModule2: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS(projet.id)),
        };
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetRemindToDoDiagnostic,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }

  async sendRemindChooseSolutionMail(lastSyncDate: Date) {
    const projetsToRemindSolution = await getProjetsForRemindToChooseSolution(lastSyncDate, new Date());
    console.log(`Nb de mails de projet avec le module Fiche Solution à faire : ${projetsToRemindSolution.length}`);
    return await Promise.all(
      projetsToRemindSolution.map(async (projet) => {
        const emailParams: EmailRemindChooseSolutionConfig = {
          userPrenom: projet.creator.prenom || "",
          projetName: projet.nom,
          typeEspaceProjet: selectEspaceByCode(projet.type_espace)?.label || "",
          urlModule3: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projet.id)),
        };
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetRemindToDoSolution,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }

  async sendRemindMakeEstimationMail(lastSyncDate: Date, nbDaysToWaitAfterAddingFicheSolution: number) {
    const projetsToRemindEstimation = await getProjetsForRemindToDoEstimation(
      removeDaysToDate(lastSyncDate, nbDaysToWaitAfterAddingFicheSolution),
      removeDaysToDate(new Date(), nbDaysToWaitAfterAddingFicheSolution),
    );
    console.log(`Nb de mails de projet où le module estimation est à faire  : ${projetsToRemindEstimation.length}`);
    const allFichesSolutions = await getAllFichesSolutions();
    return await Promise.all(
      projetsToRemindEstimation.map(async (projet) => {
        const emailParams: EmailRemindDoEstimationConfig = computeRemindToDoEstimationEmailParam(
          projet,
          allFichesSolutions,
        );
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetRemindToDoEstimation,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }

  async sendRemindChooseFinancementMail(lastSyncDate: Date, nbDaysToWaitAfterMakingEstimation: number) {
    const projetsToRemindFinancement = await getProjetsForRemindToDoFinancement(
      removeDaysToDate(lastSyncDate, nbDaysToWaitAfterMakingEstimation),
      removeDaysToDate(new Date(), nbDaysToWaitAfterMakingEstimation),
    );
    console.log(`Nb de mails de projet où le module financement est à faire : ${projetsToRemindFinancement.length}`);
    return await Promise.all(
      projetsToRemindFinancement.map(async (projet) => {
        const emailParams: EmailRemindFindFinancementConfig = {
          userPrenom: projet.creator.prenom || "",
          projetName: projet.nom,
          typeEspaceProjet: selectEspaceByCode(projet.type_espace)?.label || "",
          urlModule5: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT(projet.id)),
        };
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetRemindToDoFinancement,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }

  async sendNoActivityAfterSignupEmail1(lastSyncDate: Date, inactivityDays: number) {
    const users = await getUserWithNoActivityAfterSignup(
      lastSyncDate,
      inactivityDays,
      emailType.noProjetAfterSignupMail1,
    );
    const countAllUsers = await getCountAllUsers();

    return await Promise.all(
      users.map(async (user) => {
        const emailParams = {
          userPrenom: user.prenom || "",
          nbUtilisateurs: countAllUsers.toString(),
        };
        return await this.sendEmail({
          to: user.email,
          userId: user.id,
          emailType: emailType.noProjetAfterSignupMail1,
          params: emailParams,
          extra: emailParams,
        });
      }),
    );
  }

  async sendNoActivityAfterSignupEmail2(lastSyncDate: Date, inactivityDays: number) {
    const users = await getUserWithNoActivityAfterSignup(
      lastSyncDate,
      inactivityDays,
      emailType.noProjetAfterSignupMail2,
    );
    return await Promise.all(
      users.map(async (user) => {
        const emailParams = {
          userPrenom: user.prenom || "",
          urlUserStatus: getFullUrl(PFMV_ROUTES.MON_STATUT),
        };
        return await this.sendEmail({
          to: user.email,
          userId: user.id,
          emailType: emailType.noProjetAfterSignupMail2,
          params: emailParams,
          extra: emailParams,
        });
      }),
    );
  }

  async sendNoActivityAfterSignupEmail3(lastSyncDate: Date, inactivityDays: number) {
    const users = await getUserWithNoActivityAfterSignup(
      lastSyncDate,
      inactivityDays,
      emailType.noProjetAfterSignupMail3,
    );
    return await Promise.all(
      users.map(async (user) => {
        const nomCollectivite = user.collectivites[0]?.collectivite.nom;
        const emailParams = {
          userPrenom: user.prenom || "",
          ...(nomCollectivite && { userCollectiviteName: `pour ${nomCollectivite}` }),
        };
        return await this.sendEmail({
          to: user.email,
          userId: user.id,
          emailType: emailType.noProjetAfterSignupMail3,
          params: emailParams,
          extra: emailParams,
        });
      }),
    );
  }

  async sendRemindNotCompletedDiagnosticEmail(lastSyncDate: Date, inactivityDays: number) {
    const projets = await getProjetsForRemindDiagnosticEmail(
      removeDaysToDate(lastSyncDate, inactivityDays),
      removeDaysToDate(new Date(), inactivityDays),
    );
    console.log(`Nb de mails de diagnostics non validés à envoyer : ${projets.length}`);
    return await Promise.all(
      projets.map(async (projet) => {
        if (projet.diagnostic_simulations[0].user_id) {
          const userToContact = await getUserById(projet.diagnostic_simulations[0].user_id);
          if (userToContact && userToContact.accept_communication_suivi_projet) {
            return await this.sendEmail({
              to: userToContact.email,
              userId: userToContact.id,
              emailType: emailType.remindNotCompletedDiagnostic,
              params: {
                nomUtilisateur: userToContact.nom || "",
                nomProjet: projet.nom,
                lienRepriseDiag: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_PRESENTATION(projet.id)),
              },
            });
          } else {
            console.log(
              `Email de rappel de diag non terminé non envoyé à ${userToContact?.email} car refus email suivi`,
            );
          }
        }
      }),
    );
  }

  async sendRemindUnfinishedAndInactiveProjets1(lastSyncDate: Date, inactivityDays: number) {
    const projets = await getProjetsUnfinishedAndLastUpdatedBetween(
      removeDaysToDate(lastSyncDate, inactivityDays),
      removeDaysToDate(new Date(), inactivityDays),
    );
    console.log(`Nb de mails de projets inactifs depuis ${inactivityDays} jours à envoyer : ${projets.length}`);
    return await Promise.all(
      projets.map(async (projet) => {
        const emailParams: EmailRemindUnfinishedAndInactiveProjetConfig = {
          userPrenom: projet.creator.prenom || "",
          urlProjetStatus: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_STATUT_PROJET(projet.id)),
        };
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetUnfinishedInactive,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }

  async sendRemindUnfinishedAndInactiveProjets2(lastSyncDate: Date, inactivityDays: number) {
    const projets = await getProjetsUnfinishedAndLastUpdatedBetween2(
      removeDaysToDate(lastSyncDate, inactivityDays),
      removeDaysToDate(new Date(), inactivityDays),
    );
    console.log(`Nb de mails de projets inactifs depuis ${inactivityDays} jours à envoyer : ${projets.length}`);
    return await Promise.all(
      projets.map(async (projet) => {
        const emailParams: EmailRemindUnfinishedAndInactiveProjet2Config = {
          userPrenom: projet.creator.prenom || "",
          projetName: projet.nom,
          urlTableauDeBord: getFullUrl(PFMV_ROUTES.TABLEAU_DE_BORD(projet.id)),
        };
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetUnfinishedInactive2,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }

  async sendGetRexFromFinishedProjetEmails(lastSyncDate: Date, inactivityDays: number) {
    const projets = await getProjetsFinishedToGetRex(
      removeDaysToDate(lastSyncDate, inactivityDays),
      removeDaysToDate(new Date(), inactivityDays),
    );
    console.log(`Nb de mails de projets terminés à envoyer pour avoir un REX : ${projets.length}`);
    return await Promise.all(
      projets.map(async (projet) => {
        const emailParams = {
          userPrenom: projet.creator.prenom || "",
        };
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetFinishedToGetRex,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }

  async sendQuestionnaireSatisfactionEmails(lastSyncDate: Date, inactivityDays: number) {
    const projets = await getProjetsFinishedToGetQuestionnaire(
      removeDaysToDate(lastSyncDate, inactivityDays),
      removeDaysToDate(new Date(), inactivityDays),
    );
    console.log(`Nb de mails de projets terminés à envoyer pour le questionnaire de satisfaction : ${projets.length}`);
    return await Promise.all(
      projets.map(async (projet) => {
        const emailParams = {
          userPrenom: projet.creator.prenom || "",
        };
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetFinishedQuestionnaireSatisfaction,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === RoleProjet.ADMIN)?.id,
        });
      }),
    );
  }
}
