import {
  createEmail,
  getUserWithNoActivityAfterSignup,
  updateEmailStatus as updateEmailStatusQuery,
} from "@/src/lib/prisma/prisma-email-queries";
import { email, emailStatus, emailType } from "@prisma/client";
import { brevoSendEmail } from "./brevo-api";
import { ResponseAction } from "@/src/actions/actions-types";
import { getOldestProjectAdmin } from "@/src/lib/prisma/prisma-user-projet-queries";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations, UserProjetWithRelations, UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { getPrimaryCollectiviteForUser } from "@/src/helpers/user";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import {
  getProjetsForProjetCreationEmail,
  getProjetsForRemindDiagnosticEmail,
} from "@/src/lib/prisma/prismaProjetQueries";
import { daysUntilDate, removeDaysToDate } from "@/src/helpers/dateUtils";
import { getRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import shuffle from "lodash/shuffle";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { getUserById } from "@/src/lib/prisma/prismaUserQueries";

interface Templates {
  templateId: number;
}

type EmailSendResult = ResponseAction<{ email?: email }>;

export type EmailProjetPartageConfig = {
  username: string;
  userCollectiviteName: string;
  projetName: string;
  projetCollectiviteName: string;
  link: string;
  destinationMail: string;
};

export type EmailProjetCreationParam = {
  nomUtilisateur: string;
  nomProjet: string;
  rex1Titre?: string;
  rex1Url?: string;
  rex2Titre?: string;
  rex2Url?: string;
  rex3Titre?: string;
  rex3Url?: string;
  rex4Titre?: string;
  rex4Url?: string;
};

const computeProjetCreationEmailParam = (
  projet: ProjetWithRelations,
  rexExamples: RetourExperience[],
): EmailProjetCreationParam => {
  if (rexExamples.length < 3) {
    return {
      nomProjet: projet.nom,
      nomUtilisateur: projet.creator.nom || "",
    };
  } else {
    return {
      nomProjet: projet.nom,
      nomUtilisateur: projet.creator.nom || "",
      rex1Titre: rexExamples[0].attributes.titre,
      rex1Url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE(rexExamples[0].attributes.slug)),
      rex2Titre: rexExamples[1].attributes.titre,
      rex2Url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE(rexExamples[1].attributes.slug)),
      rex3Titre: rexExamples[2].attributes.titre,
      rex3Url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE(rexExamples[2].attributes.slug)),
      rex4Titre: rexExamples[3]?.attributes.titre,
      ...(rexExamples[3] && { rex4Url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE(rexExamples[3]?.attributes.slug)) }),
    };
  }
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
      projetCreation: {
        templateId: 54,
      },
      noActivityAfterSignup: {
        templateId: 53,
      },
      remindNotCompletedDiagnostic: {
        templateId: 60,
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
    params?: Record<string, string>;
    userProjetId?: number;
    userId?: string;
    extra?: any;
  }): Promise<EmailSendResult> {
    const { templateId } = this.templates[emailType];
    const dbEmail = await createEmail({ to, emailType, userProjetId, userId, extra });

    try {
      const response = await brevoSendEmail(to, templateId, params);

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
        link: `${process.env.NEXT_PUBLIC_URL_SITE}${PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(
          userProjet.projet_id,
          "partage",
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

  async sendContactMessageReceivedEmail(data: ContactFormData) {
    return this.sendEmail({ to: data.email, emailType: emailType.contactMessageSent, extra: data });
  }

  async sendWelcomeMessageEmail(data: Pick<ContactFormData, "email" | "nom">) {
    return this.sendEmail({
      to: data.email,
      emailType: emailType.welcomeMessage,
      params: { NOM: data.nom },
      extra: data,
    });
  }

  async sendProjetCreationEmail(lastSyncDate: Date) {
    const projets = await getProjetsForProjetCreationEmail(lastSyncDate, new Date());
    console.log(`Nb de mails de création de projet à envoyer : ${projets.length}`);
    const allRex = await getRetoursExperiences();
    const shuffledRex = shuffle(allRex);
    return await Promise.all(
      projets.map(async (projet) => {
        const rexExamples = shuffledRex
          // @ts-ignore
          .filter((rex) => rex.attributes.types_espaces?.includes(projet.type_espace))
          .slice(0, 4);
        const emailParams = computeProjetCreationEmailParam(projet, rexExamples);
        return await this.sendEmail({
          to: projet.creator.email,
          emailType: emailType.projetCreation,
          params: emailParams,
          extra: emailParams,
          userProjetId: projet.users.find((up) => up.role === "ADMIN")?.id,
        });
      }),
    );
  }

  async sendNoActivityAfterSignupEmail(lastSyncDate: Date, inactivityDays = 10) {
    const users = await getUserWithNoActivityAfterSignup(lastSyncDate, inactivityDays);

    return await Promise.all(
      users.map(async (user) => {
        const result = await this.sendEmail({
          to: user.email,
          userId: user.id,
          emailType: emailType.noActivityAfterSignup,
          params: {
            nom: user.nom || "",
            dateCreationCompte: Math.abs(daysUntilDate(user.created_at)!)?.toString() || "10",
          },
        });

        if (result.type === "success") {
          console.log(`Email envoyé à ${user.email} - type: ${emailType.noActivityAfterSignup}`);
        }

        return result;
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
          if (userToContact) {
            const result = await this.sendEmail({
              to: userToContact.email,
              userId: userToContact.id,
              emailType: emailType.remindNotCompletedDiagnostic,
              params: {
                nomUtilisateur: userToContact.nom || "",
                nomProjet: projet.nom,
                lienRepriseDiag: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_PRESENTATION(projet.id)),
              },
            });

            if (result.type === "success") {
              console.log(`Email envoyé à ${userToContact.email} - type: ${emailType.remindNotCompletedDiagnostic}`);
            }
            return result;
          }
        }
      }),
    );
  }
}
