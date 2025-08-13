import { getUsersAndProjectsFromLastSync, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { connectBatchSync } from "@/src/services/connect";
import {
  makeConnectSyncBatchErrorWebhookData,
  makeConnectSyncBatchWebhookData,
} from "@/src/services/mattermost/mattermost-helpers";
import { sendMattermostWebhook } from "@/src/services/mattermost";

const syncWithConnect = async () => {
  if (process.env.CONNECT_SYNC_ACTIVE !== "true") {
    console.log("La synchronisation avec Connect n'est pas activée sur cet environnement.");
    return;
  }
  try {
    const startedDate = new Date();
    console.log("Récupération des utilisateurs depuis la dernière synchronisation...");

    const usersAndProjectsFromLastSync = await getUsersAndProjectsFromLastSync({
      service: "connect",
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
      await sendMattermostWebhook(webhookData, "batch", 5000);
      await saveCronJob(startedDate, new Date(), "SYNC_CONNECT");
      process.exit(0);
    }

    const activeUsersAndProjects = filteredUsersAndProject.map((user) => ({
      ...user,
      projets: user.projets.filter((p) => !p.projet.deleted_at),
    }));

    console.log("Début de la synchronisation avec Connect...");
    const connectResult = await connectBatchSync(activeUsersAndProjects);
    if (!connectResult.success) {
      captureError("Erreur lors de la synchronisation avec Connect:", {
        errors: connectResult.errors,
      });
      const webhookData = makeConnectSyncBatchErrorWebhookData(`Erreur lors du batch de synchronisation Connect.
${JSON.stringify(connectResult.errors)}
${connectResult.message}`);
      await sendMattermostWebhook(webhookData, "batch", 5000);
      process.exit(1);
    }
    const webhookData = makeConnectSyncBatchWebhookData(connectResult.message);
    await sendMattermostWebhook(webhookData, "batch", 5000);
    await saveCronJob(startedDate, new Date(), "SYNC_CONNECT");
    process.exit(0);
  } catch (error) {
    captureError("Erreur lors de la synchronisation avec Connect:", error);
    const webhookData = makeConnectSyncBatchErrorWebhookData("Erreur lors du batch de synchronisation Connect.");
    await sendMattermostWebhook(webhookData, "batch", 5000);
    process.exit(1);
  }
};

syncWithConnect();
