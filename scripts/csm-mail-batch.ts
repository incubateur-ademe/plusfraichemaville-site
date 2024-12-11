import { getLastCsmMailBatch, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EmailService } from "@/src/services/brevo";

const main = async () => {
  if (process.env.CSM_MAIL_BATCH_ACTIVE !== "true") {
    console.log("Le batch des mails CSM n'est pas activé sur cet environnement.");
    return;
  }

  try {
    const emailService = new EmailService();
    const startedDate = new Date();
    const lastSync = await getLastCsmMailBatch();
    const lastSyncDate = lastSync?.execution_end_time ?? new Date(0);

    const INACTIVITY_DAYS = 10;
    console.log(`Recherche des utilisateurs inactifs depuis ${INACTIVITY_DAYS} jours...`);
    await emailService.sendNoActivityAfterSignupEmail(lastSyncDate, INACTIVITY_DAYS);

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
