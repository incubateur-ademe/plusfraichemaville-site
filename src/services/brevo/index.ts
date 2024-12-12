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
import { UserProjetWithRelations, UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { getPrimaryCollectiviteForUser } from "@/src/helpers/user";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import { daysUntilDate } from "@/src/helpers/dateUtils";

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
      noActivityAfterSignup: {
        templateId: 53,
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

  async sendNoActivityAfterSignupEmail(lastSyncDate: Date, inactivityDays = 10) {
    const users = await getUserWithNoActivityAfterSignup(lastSyncDate, inactivityDays);
    const mails = users.map((user) => user.email);
    console.log(mails);
    if (!users?.length) {
      return { message: "Aucun utilisateur trouvé." };
    } else {
      const results = await Promise.all(
        users.map(async (user) => {
          const result = await this.sendEmail({
            to: user.email,
            userId: user.id,
            emailType: emailType.noActivityAfterSignup,
            params: {
              nom: user.nom || "",
              date_creation_compte: Math.abs(daysUntilDate(user.created_at)!)?.toString() || "10",
            },
          });

          if (result.type === "success") {
            console.log(`Email envoyé à ${user.email} - type: ${emailType.noActivityAfterSignup}`);
          }

          return result;
        }),
      );
      return results;
    }
  }
}
