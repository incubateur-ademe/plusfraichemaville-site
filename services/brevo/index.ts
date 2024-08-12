import { createEmail, updateEmailStatus as updateEmailStatusQuery } from "@/lib/prisma/prisma-email-queries";
import { email, emailStatus, emailType, projet, User, user_projet } from "@prisma/client";
import { brevoSender } from "./brevo-sender";
import { ResponseAction } from "@/actions/actions-types";
import { getOldestProjectAdmin } from "@/lib/prisma/prisma-user-projet-queries";
import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { UserProjetWithRelations, UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { getPrimaryCollectiviteForUser } from "@/helpers/user";
import { PFMV_ROUTES } from "@/helpers/routes";

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
    };
  }

  private async updateEmailStatus(id: string, status: emailStatus, brevoId?: string): Promise<email> {
    return updateEmailStatusQuery(id, status, brevoId);
  }

  private async sendEmail(
    to: string,
    emailType: emailType,
    params: EmailProjetPartageConfig,
    userProjetId?: number,
  ): Promise<EmailSendResult> {
    const { templateId } = this.templates[emailType];

    const dbEmail = await createEmail(to, emailType, userProjetId);
    try {
      const response = await brevoSender(to, templateId, params);

      if (!response.ok) {
        throw new Error(`Erreur avec l'API Brevo : ${response.status}`);
      }

      const data = await response.json();

      let email = null;
      email = await this.updateEmailStatus(dbEmail.id, emailStatus.SUCCESS, data.messageId);

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
      link: `${process.env.NEXT_PUBLIC_URL_SITE}${PFMV_ROUTES.ESPACE_PROJET_WITH_CURRENT_TAB("invitation")}`,
    };

    return this.sendEmail(email, emailType.projetInvitation, params, userProjet.id);
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

      return this.sendEmail(oldestAdmin.user.email, emailType.projetRequestAccess, params);
    }
    return { type: "error", message: "ADMIN_NOT_FOUND" };
  }
}
