import { createEmail, updateEmailStatus as updateEmailStatusQuery } from "@/lib/prisma/prisma-email-queries";
import { email, emailStatus, emailType, projet, User, user_projet } from "@prisma/client";
import { brevoSender } from "./brevo-sender";
import { ResponseAction } from "@/actions/actions-types";
import { getOldestProjectAdmin } from "@/lib/prisma/prisma-user-projet-queries";
import { captureError } from "@/lib/sentry/sentryCustomMessage";
import { UserProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

interface Templates {
  templateId: number;
}

type EmailSendResult = ResponseAction<{ email?: email }>;

export class EmailService {
  private readonly templates: Record<emailType, Templates>;

  constructor() {
    this.templates = {
      projetInvitation: {
        templateId: 15,
      },
      projetRequestAccess: {
        templateId: 2,
      },
    };
  }

  private async updateEmailStatus(id: string, status: emailStatus, brevoId?: string): Promise<email> {
    return updateEmailStatusQuery(id, status, brevoId);
  }

  private async sendEmail(
    to: string,
    emailType: emailType,
    params: Record<string, string>,
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

  async sendInvitationEmail(email: string, projet: projet, userProjet: user_projet): Promise<EmailSendResult> {
    return this.sendEmail(email, emailType.projetInvitation, {
      projet: projet.nom,
      invitationToken: userProjet.invitation_token ?? "",
    });
  }

  async sendRequestAccessEmail(userProjet: UserProjetWithRelations) {
    if (!userProjet.user) {
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
    const oldestAdmin = await getOldestProjectAdmin(userProjet.projet_id);
    if (oldestAdmin && oldestAdmin.user?.email) {
      return this.sendEmail(oldestAdmin.user.email, emailType.projetRequestAccess, {
        projectName: userProjet.projet.nom,
        requesterName: `${userProjet.user.prenom} ${userProjet.user.nom}`,
        invitationToken: userProjet.invitation_token ?? "",
      });
    }
    return { type: "error", message: "ADMIN_NOT_FOUND" };
  }
}
