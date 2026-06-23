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

    const USER_NO_PROJET_2_DAYS = 14;
    console.log(`Recherche des utilisateurs sans projet depuis ${USER_NO_PROJET_2_DAYS} jours...`);
    const inactiveUserMail2 = await emailService.sendNoActivityAfterSignupEmail2(
      lastSyncDate ?? removeDaysToDate(new Date(), USER_NO_PROJET_2_DAYS),
      USER_NO_PROJET_2_DAYS,
    );

    const USER_NO_PROJET_3_DAYS = 45;
    console.log(`Recherche des utilisateurs sans projet depuis ${USER_NO_PROJET_3_DAYS} jours...`);
    const inactiveUserMail3 = await emailService.sendNoActivityAfterSignupEmail3(
      lastSyncDate ?? removeDaysToDate(new Date(), USER_NO_PROJET_3_DAYS),
      USER_NO_PROJET_3_DAYS,
    );

    const FINISHED_PROJET_GET_QUESTIONNAIRE_SATISFACTION = 5;
    console.log(`Recherche des projets terminés depuis ${FINISHED_PROJET_GET_QUESTIONNAIRE_SATISFACTION} jours...`);
    const finishedProjetGetQuestionnaire = await emailService.sendQuestionnaireSatisfactionEmails(
      lastSyncDate ?? removeDaysToDate(new Date(), FINISHED_PROJET_GET_QUESTIONNAIRE_SATISFACTION),
      FINISHED_PROJET_GET_QUESTIONNAIRE_SATISFACTION,
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

    const REMIND_TO_CHOOSE_SOLUTION_AFTER_DIAG_DAYS = 7;
    const REMIND_TO_CHOOSE_SOLUTION_AFTER_PROJET_CREATION_DAYS = 14;
    console.log("Recherche à relancer pour choisir fiche solution après diagnostic");
    const sendRemindFicheSolutionMail = await emailService.sendRemindChooseSolutionMailAfterDiagnostic(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_TO_CHOOSE_SOLUTION_AFTER_DIAG_DAYS),
      REMIND_TO_CHOOSE_SOLUTION_AFTER_DIAG_DAYS,
      REMIND_TO_CHOOSE_SOLUTION_AFTER_PROJET_CREATION_DAYS,
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
      REMIND_TO_FILL_FINANCEMENT_DAYS,
    );

    const REMIND_TO_FILL_FINANCEMENT_WITHOUT_ESTIMATION_DAYS = 21;
    console.log("Recherche des projets sans financement sans estimation");
    const sendRemindFinancementMailWithoutEstimation =
      await emailService.sendRemindChooseFinancementMailWithoutEstimation(
        lastSyncDate ?? removeDaysToDate(new Date(), REMIND_TO_FILL_FINANCEMENT_WITHOUT_ESTIMATION_DAYS),
        REMIND_TO_FILL_FINANCEMENT_WITHOUT_ESTIMATION_DAYS,
      );

    const REMIND_TO_SAVE_CONTACT_DAYS = 28;
    console.log("Recherche des projets avec fiche solution sans contact");
    const sendRemindSaveContact = await emailService.sendRemindSaveContactMail(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_TO_SAVE_CONTACT_DAYS),
      REMIND_TO_SAVE_CONTACT_DAYS,
    );

    const REMIND_UNFINISHED_INACTIVE_PROJET_1_DAYS = 14;
    console.log(`Recherche des projets inactifs depuis ${REMIND_UNFINISHED_INACTIVE_PROJET_1_DAYS} jours non terminés`);
    const sendRemindInactiveProjetMail1 = await emailService.sendRemindUnfinishedAndInactiveProjets1(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_UNFINISHED_INACTIVE_PROJET_1_DAYS),
      REMIND_UNFINISHED_INACTIVE_PROJET_1_DAYS,
    );

    const REMIND_UNFINISHED_INACTIVE_PROJET_2_DAYS = 61;
    console.log(`Recherche des projets inactifs depuis ${REMIND_UNFINISHED_INACTIVE_PROJET_2_DAYS} jours non terminés`);
    const sendRemindInactiveProjetMail2 = await emailService.sendRemindUnfinishedAndInactiveProjets2(
      lastSyncDate ?? removeDaysToDate(new Date(), REMIND_UNFINISHED_INACTIVE_PROJET_2_DAYS),
      REMIND_UNFINISHED_INACTIVE_PROJET_2_DAYS,
    );

    await saveCronJob(startedDate, new Date(), "CSM_MAIL_BATCH");
    const webhookData = makeCsmBatchWebhookData({
      nbMailRemindModuleDiagnostic: sendRemindModuleDiagnosticMail.length,
      nbMailsInactiveUser2: inactiveUserMail2.length,
      nbMailsInactiveUser3: inactiveUserMail3.length,
      nbMailsSendQuestionnaireForFinishedProjet: finishedProjetGetQuestionnaire.length,
      nbMailsUnfinishedDiag: unfinishedDiagPromises.length,
      nbMailsRemindSolution: sendRemindFicheSolutionMail.length,
      nbMailsRemindEstimation: sendRemindEstimationMail.length,
      nbMailsRemindFinancement: sendRemindFinancementMail.length,
      nbMailsInactiveProjet1: sendRemindInactiveProjetMail1.length,
      nbMailsInactiveProjet2: sendRemindInactiveProjetMail2.length,
      nbMailsRemindFinancementWithoutEstimation: sendRemindFinancementMailWithoutEstimation.length,
      nbMailsRemindSaveContact: sendRemindSaveContact.length,
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
