import { getLastCsmMailBatch, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EmailService } from "@/src/services/brevo";

const main = async () => {
  if (process.env.CSM_MAIL_BATCH_ENV !== "true") {
    console.log("La synchronisation n'a pas aboutie : éxecution hors d'un environnement de production.");
    return;
  }

  try {
    const emailService = new EmailService();
    const startedDate = new Date();
    const lastSync = await getLastCsmMailBatch();
    const lastSyncDate = lastSync?.execution_end_time ?? new Date(0);

    const INACTIVITY_DAYS = 10;
    console.log(`Recherche des utilisateurs inactifs depuis ${INACTIVITY_DAYS} jours...`);
    const { success, message } = await emailService.sendNoActivityAfterSignupEmail(lastSyncDate, INACTIVITY_DAYS);
    if (!success) {
      captureError(message, { executionTime: new Date() });
      process.exit(1);
    }
    console.log(message);

    await saveCronJob(startedDate, new Date(), "CSM_MAIL_BATCH");
    console.log("Batch des mails CSM réussi !");
    process.exit(0);
  } catch (error) {
    customCaptureException("Erreur lors du batch des mails CSM.", {
      executionTime: new Date(),
    });
    process.exit(1);
  }
};

main();
