import { parseArgs } from "node:util";
import { getUsersAndProjectsFromLastSync, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { connectBatchSync } from "@/src/services/connect";
import {
  makeConnectSyncBatchErrorWebhookData,
  makeConnectSyncBatchWebhookData,
} from "@/src/services/teams/ms-teams-helpers";
import { sendMSTeamsWebhook } from "@/src/services/teams/ms-teams-webhook";

const parseBatchOptions = (): { delayMs?: number; endDate?: Date } => {
  const { values } = parseArgs({
    options: {
      delay: { type: "string" },
      "end-date": { type: "string" },
    },
  });

  if (values.delay !== undefined && !/^\d+$/.test(values.delay)) {
    throw new Error(`--delay doit être un nombre entier de millisecondes : ${values.delay}`);
  }

  const endDateArg = values["end-date"];
  const endDate = endDateArg !== undefined ? new Date(endDateArg) : undefined;
  if (endDate) {
    const isValidDate =
      /^\d{4}-\d{2}-\d{2}$/.test(endDateArg!) &&
      !isNaN(endDate.getTime()) &&
      endDate.toISOString().startsWith(endDateArg!);
    if (!isValidDate) {
      throw new Error(`--end-date doit être une date valide au format yyyy-mm-dd : ${endDateArg}`);
    }
    // Une date future dans execution_end_time ferait ignorer les modifications jusqu'à cette date.
    if (endDate > new Date()) {
      throw new Error(`--end-date ne peut pas être dans le futur : ${endDateArg}`);
    }
  }

  return { delayMs: values.delay !== undefined ? Number(values.delay) : undefined, endDate };
};

const syncWithConnect = async () => {
  let delayMs: number | undefined;
  let endDate: Date | undefined;
  try {
    ({ delayMs, endDate } = parseBatchOptions());
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  if (process.env.CONNECT_SYNC_ACTIVE !== "true") {
    console.log("La synchronisation avec Connect n'est pas activée sur cet environnement.");
    return;
  }
  try {
    const startedDate = new Date();
    console.log("Récupération des utilisateurs depuis la dernière synchronisation...");

    const usersAndProjectsFromLastSync = await getUsersAndProjectsFromLastSync({
      service: "connect",
      endDate,
    });
    const filteredUsersAndProject = usersAndProjectsFromLastSync.filter(
      (userAndProjects) =>
        !userAndProjects.email.endsWith("ademe.fr") &&
        !userAndProjects.email.endsWith("beta.gouv.fr") &&
        userAndProjects.email !== "marie.racine@dihal.gouv.fr",
    );

    if (!filteredUsersAndProject.length) {
      console.log("Aucune nouvelle donnée à synchroniser.");
      const webhookData = makeConnectSyncBatchWebhookData("Aucune nouvelle donnée à synchroniser.");
      await sendMSTeamsWebhook(webhookData.text);
      await saveCronJob(startedDate, endDate ?? new Date(), "SYNC_CONNECT");
      process.exit(0);
    }

    console.log("Début de la synchronisation avec Connect...");
    const connectResult = await connectBatchSync(filteredUsersAndProject, delayMs);
    if (!connectResult.success) {
      captureError("Erreur lors de la synchronisation avec Connect:", {
        errors: connectResult.errors,
      });
      const webhookData = makeConnectSyncBatchErrorWebhookData(`Erreur lors du batch de synchronisation Connect.
${JSON.stringify(connectResult.errors)}
${connectResult.message}`);
      await sendMSTeamsWebhook(webhookData.text);
      process.exit(1);
    }
    const webhookData = makeConnectSyncBatchWebhookData(connectResult.message);
    await sendMSTeamsWebhook(webhookData.text);
    await saveCronJob(startedDate, endDate ?? new Date(), "SYNC_CONNECT");
    process.exit(0);
  } catch (error) {
    captureError("Erreur lors de la synchronisation avec Connect:", error);
    const webhookData = makeConnectSyncBatchErrorWebhookData("Erreur lors du batch de synchronisation Connect.");
    await sendMSTeamsWebhook(webhookData.text);
    process.exit(1);
  }
};

syncWithConnect();
