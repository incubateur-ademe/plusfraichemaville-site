import { createEmailRecord, updateEmailStatus as updateEmailStatusQuery } from "@/lib/prisma/prisma-email-queries";
import { email, emailStatus, emailType } from "@prisma/client";
import { brevoFetcher } from "./fetcher";
import { getOldestProjectAdmin } from "@/lib/prisma/prismaUserQueries";

interface Templates {
  templateId: number;
}

export class EmailService {
  private readonly templates: Record<emailType, Templates>;

  constructor() {
    this.templates = {
      projetInvitation: {
        templateId: 1,
      },
      projetRequestAccess: {
        templateId: 2,
      },
    };
  }

  private async createEmailRecord(to: string, type: emailType): Promise<string> {
    const emailRecord = await createEmailRecord(to, type);
    return emailRecord.id;
  }

  private async updateEmailStatus(id: string, status: emailStatus, brevoId?: string): Promise<email> {
    const email = updateEmailStatusQuery(id, status, brevoId);
    return email;
  }

  private async sendEmail(
    to: string,
    type: emailType,
    params: Record<string, string>,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const { templateId } = this.templates[type];

    try {
      const emailRecordId = await this.createEmailRecord(to, type);
      const response = await brevoFetcher(to, templateId, params);

      if (!response.ok) {
        throw new Error(`Erreur avec l'API Brevo : ${response.status}`);
      }

      const data = await response.json();
      await this.updateEmailStatus(emailRecordId, emailStatus.SUCCESS, data.messageId);

      return { success: true, messageId: data.messageId };
    } catch (error) {
      console.error("Erreur lors de l'envoi du mail : ", error);

      if (error instanceof Error && "emailRecordId" in error) {
        await this.updateEmailStatus((error as any).emailRecordId, emailStatus.ERROR);
      }

      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async sendInvitationEmail(userEmail: string, projectName: string, invitationLink: string) {
    return this.sendEmail(userEmail, "projetInvitation", {
      projectName,
      invitationLink,
    });
  }

  async sendRequestAccessEmail(projectId: number, requesterName: string, requestedLink: string) {
    const oldestAdmin = await getOldestProjectAdmin(projectId);
    if (oldestAdmin) {
      const adminEmail = oldestAdmin.user?.email;
      const projectName = oldestAdmin.projet.nom;
      if (adminEmail && projectName) {
        return this.sendEmail(adminEmail, "projetRequestAccess", {
          projectName,
          requesterName,
          requestedLink,
        });
      }
    }
  }
}

// TODO: utiliser le requesterName, requestedLink comme suit dans les templates brevo :
// <p>{{params.requesterName}} a demandé l'accès au projet {{params.projectName}}.</p>
// <p>Pour gérer cette demande, <a href="{{params.requestedLink}}">cliquez ici</a>.</p>
