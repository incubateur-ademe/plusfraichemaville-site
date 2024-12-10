import { getLastCsmMailBatch, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EmailService } from "@/src/services/brevo";

const syncWithHubspot = async () => {
  if (process.env.HUBSPOT_SYNC_ENV !== "true") {
    console.log("La synchronisation n'a pas aboutie : éxecution hors d'un environnement de production.");
    return;
  }

  try {
    const emailService = new EmailService();
    const startedDate = new Date();
    const lastSync = await getLastCsmMailBatch();
    const lastSyncDate = lastSync?.execution_end_time ?? new Date(0);

    console.log("Recherche des utilisateurs inactifs plus de 10 jours après leur inscription...");
    const emailNoActivity = await emailService.sendNoActivityAfterSignupEmail(lastSyncDate);
    if (!emailNoActivity.success) {
      captureError(emailNoActivity.message, {
        executionTime: new Date(),
      });
      process.exit(1);
    }

    await saveCronJob(startedDate, new Date(), "CSM_MAIL_BATCH");
    console.log("Batch des mails CSM réussi !");
    process.exit(0);
  } catch (error) {
    customCaptureException("Erreur lors du batch des mails CSM.", {});
    process.exit(1);
  }
};

syncWithHubspot();
