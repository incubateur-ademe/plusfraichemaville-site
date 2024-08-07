import { updateEmailStatus as updateEmailStatusQuery } from "@/lib/prisma/prisma-email-queries";
import { email, emailStatus, emailType } from "@prisma/client";
import { brevoFetcher } from "./fetcher";
import { getOldestProjectAdmin } from "@/lib/prisma/prismaUserQueries";
import { ResponseAction } from "@/actions/actions-types";

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
      const response = await brevoFetcher(to, templateId, params);

      if (!response.ok) {
        throw new Error(`Erreur avec l'API Brevo : ${response.status}`);
      }

      const data = await response.json();

      const email = await this.updateEmailStatus(existingEmailId || "", emailStatus.SUCCESS, data.messageId);

      return { type: "success", message: "EMAIL_SENT", email };
    } catch (error) {
      console.error("Erreur lors de l'envoi du mail : ", error);

      if (existingEmailId) {
        await this.updateEmailStatus(existingEmailId, emailStatus.ERROR);
      }

      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }

  async sendInvitationEmail(
    email: string,
    projectName: string,
    invitationToken?: string | null,
    existingEmailId?: string,
  ): Promise<EmailSendResult> {
    return this.sendEmail(
      email,
      "projetInvitation",
      {
        projectName,
        invitationToken: invitationToken ?? "",
      },
      existingEmailId,
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

