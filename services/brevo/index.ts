import { createEmail, updateEmailStatus as updateEmailStatusQuery } from "@/lib/prisma/prisma-email-queries";
import { email, emailStatus, emailType, projet, user_projet } from "@prisma/client";
import { brevoSender } from "./brevo-sender";
import { ResponseAction } from "@/actions/actions-types";
import { getOldestProjectAdmin } from "@/lib/prisma/prisma-user-projet-queries";
import { captureError } from "@/lib/sentry/sentryCustomMessage";

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
    type: emailType,
    params: Record<string, string>,
    existingEmailId?: string,
  ): Promise<EmailSendResult> {
    const { templateId } = this.templates[type];

    try {
      const response = await brevoSender(to, templateId, params);

      if (!response.ok) {
        throw new Error(`Erreur avec l'API Brevo : ${response.status}`);
      }

      const data = await response.json();

      let email = null;
      if (existingEmailId) {
        email = await this.updateEmailStatus(existingEmailId || "", emailStatus.SUCCESS, data.messageId);
      }

      return { type: "success", message: "EMAIL_SENT", email };
    } catch (error) {
      captureError("Erreur lors de l'envoi du mail : ", error);
      if (existingEmailId) {
        await this.updateEmailStatus(existingEmailId, emailStatus.ERROR);
      }
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }

  async sendInvitationEmail(email: string, projet: projet, userProjet: user_projet): Promise<EmailSendResult> {
    const dbEmail = await createEmail(email, emailType.projetInvitation, userProjet.id);
    return this.sendEmail(
      email,
      "projetInvitation",
      {
        projet: projet.nom,
        invitationToken: userProjet.invitation_token ?? "",
      },
      dbEmail.id,
    );
  }

  async sendRequestAccessEmail(
    projectId: number,
    requesterName: string,
    invitationToken: string,
    existingEmailId?: string,
  ) {
    const oldestAdmin = await getOldestProjectAdmin(projectId);
    if (oldestAdmin && oldestAdmin.user?.email && oldestAdmin.projet.nom) {
      return this.sendEmail(
        oldestAdmin.user.email,
        "projetRequestAccess",
        {
          projectName: oldestAdmin.projet.nom,
          requesterName,
          invitationToken,
        },
        existingEmailId,
      );
    }
    return { type: "error", message: "ADMIN_NOT_FOUND" };
  }
}
