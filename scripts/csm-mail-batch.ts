import { removeDaysToDate } from "@/src/helpers/dateUtils";
import { getLastCsmMailBatch, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EmailService } from "@/src/services/brevo";
import { makeBatchErrorWebhookData, makeCsmBatchWebhookData } from "@/src/services/mattermost/mattermost-helpers";
import { sendMattermostWebhook } from "@/src/services/mattermost";

const main = async () => {
  if (process.env.CSM_MAIL_BATCH_ACTIVE !== "true") {
    console.log("Le batch des mails CSM n'est pas activé sur cet environnement.");
    return;
  }

  try {
    const emailService = new EmailService();
    const startedDate = new Date();
    const lastSync = await getLastCsmMailBatch();
    const lastSyncDate = lastSync?.execution_end_time;

    const INACTIVITY_DAYS = 10;
    console.log(`Recherche des utilisateurs inactifs depuis ${INACTIVITY_DAYS} jours...`);
    const inactiveUserPromises = await emailService.sendNoActivityAfterSignupEmail(
      lastSyncDate ?? removeDaysToDate(new Date(), INACTIVITY_DAYS),
      INACTIVITY_DAYS,
    );

    console.log("Recherche des nouveaux projets...");
    const sendProjetEmailsPromises = await emailService.sendProjetCreationEmail(
      lastSyncDate ?? removeDaysToDate(new Date(), 3),
    );

    const REMIND_UNFINISGED_DIAG_DAYS = 7;
    console.log(`Recherche des projets avec diagnostics non validés  depuis ${REMIND_UNFINISGED_DIAG_DAYS} jours...`);
    const unfinishedDiagPromises = await emailService.sendRemindNotCompletedDiagnosticEmail(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_UNFINISGED_DIAG_DAYS),
      REMIND_UNFINISGED_DIAG_DAYS,
    );

    await saveCronJob(startedDate, new Date(), "CSM_MAIL_BATCH");
    const webhookData = makeCsmBatchWebhookData({
      nbMailCreationProjet: sendProjetEmailsPromises.length,
      nbMailsInactiveUser: inactiveUserPromises.length,
      nbMailsUnfinishedDiag: unfinishedDiagPromises.length,
    });
    await sendMattermostWebhook(webhookData, "batch", 5000);
    console.log("Batch des mails CSM réussi !");
    process.exit(0);
  } catch (error) {
    customCaptureException("Erreur lors du batch des mails CSM.", error);
    await sendMattermostWebhook(makeBatchErrorWebhookData("Erreur lors du batch des mails CSM."), "batch", 5000);
    process.exit(1);
  }
};

main();
