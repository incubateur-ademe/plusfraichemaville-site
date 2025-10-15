import { removeDaysToDate } from "@/src/helpers/dateUtils";
import { getLastCsmMailBatch, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EmailService } from "@/src/services/brevo";
import { makeBatchErrorWebhookData, makeCsmBatchWebhookData } from "@/src/services/mattermost/mattermost-helpers";
import { sendMattermostWebhook } from "@/src/services/mattermost";
import { $Enums } from "@/src/generated/prisma/client";
import emailType = $Enums.emailType;

export type MAIL_USER_WITHOUT_PROJET_TYPE = {
  email: emailType;
  nbDays: number;
};

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

    const USER_NO_PROJET_1_DAYS = 2;
    console.log(`Recherche des utilisateurs sans projet depuis ${USER_NO_PROJET_1_DAYS} jours...`);
    const inactiveUserMail1 = await emailService.sendNoActivityAfterSignupEmail1(
      lastSyncDate ?? removeDaysToDate(new Date(), USER_NO_PROJET_1_DAYS),
      USER_NO_PROJET_1_DAYS,
    );

    const USER_NO_PROJET_2_DAYS = 14;
    console.log(`Recherche des utilisateurs sans projet depuis ${USER_NO_PROJET_2_DAYS} jours...`);
    const inactiveUserMail2 = await emailService.sendNoActivityAfterSignupEmail2(
      lastSyncDate ?? removeDaysToDate(new Date(), USER_NO_PROJET_2_DAYS),
      USER_NO_PROJET_2_DAYS,
    );

    const FINISHED_PROJET_GET_REX = 183;
    console.log(`Recherche des projets terminés depuis 6 mois...`);
    const finishedProjetGetRexMail = await emailService.sendGetRexFromFinishedProjetEmails(
      lastSyncDate ?? removeDaysToDate(new Date(), FINISHED_PROJET_GET_REX),
      FINISHED_PROJET_GET_REX,
    );

    const REMIND_UNFINISHED_DIAG_DAYS = 7;
    console.log(`Recherche des projets avec diagnostics non validés  depuis ${REMIND_UNFINISHED_DIAG_DAYS} jours...`);
    const unfinishedDiagPromises = await emailService.sendRemindNotCompletedDiagnosticEmail(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_UNFINISHED_DIAG_DAYS),
      REMIND_UNFINISHED_DIAG_DAYS,
    );

    console.log("Recherche à relancer pour module diagnostic");
    const sendRemindModuleDiagnosticMail = await emailService.sendRemindDoDiagnosticMail(
      lastSyncDate ?? removeDaysToDate(new Date(), 3),
    );

    console.log("Recherche à relancer pour choisir fiche solution");
    const sendRemindFicheSolutionMail = await emailService.sendRemindChooseSolutionMail(
      lastSyncDate ?? removeDaysToDate(new Date(), 3),
    );

    const REMIND_TO_FILL_ESTIMATION_DAYS = 7;
    console.log("Recherche des projets avec fiche solution sans estimation");
    const sendRemindEstimationMail = await emailService.sendRemindMakeEstimationMail(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_TO_FILL_ESTIMATION_DAYS),
      REMIND_TO_FILL_ESTIMATION_DAYS,
    );

    const REMIND_TO_FILL_FINANCEMENT_DAYS = 2;
    console.log("Recherche des projets avec estimation sans financement");
    const sendRemindFinancementMail = await emailService.sendRemindChooseFinancementMail(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_TO_FILL_FINANCEMENT_DAYS),
      REMIND_TO_FILL_ESTIMATION_DAYS,
    );

    const REMIND_UNFINISHED_INACTIVE_PROJET_DAYS = 14;
    console.log("Recherche des projets inactifs non terminés");
    const sendRemindInactiveProjetMail = await emailService.sendRemindUnfinishedAndInactiveProjets(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_UNFINISHED_INACTIVE_PROJET_DAYS),
      REMIND_UNFINISHED_INACTIVE_PROJET_DAYS,
    );

    await saveCronJob(startedDate, new Date(), "CSM_MAIL_BATCH");
    const webhookData = makeCsmBatchWebhookData({
      nbMailRemindModuleDiagnostic: sendRemindModuleDiagnosticMail.length,
      nbMailsInactiveUser1: inactiveUserMail1.length,
      nbMailsInactiveUser2: inactiveUserMail2.length,
      nbMailsGetRexFromFinishedProjet: finishedProjetGetRexMail.length,
      nbMailsUnfinishedDiag: unfinishedDiagPromises.length,
      nbMailsRemindSolution: sendRemindFicheSolutionMail.length,
      nbMailsRemindEstimation: sendRemindEstimationMail.length,
      nbMailsRemindFinancement: sendRemindFinancementMail.length,
      nbMailsInactiveProjet: sendRemindInactiveProjetMail.length,
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
