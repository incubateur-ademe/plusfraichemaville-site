import { getUsersAndProjectsFromLastSync, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { batchSyncConnectContacts } from "@/src/services/connect";
import { mapUserToConnectContact } from "@/src/services/connect/connect-helpers";
import {
  makeConnectSyncBatchErrorWebhookData,
  makeConnectSyncBatchWebhookData,
} from "@/src/services/mattermost/mattermost-helpers";
import { sendMattermostWebhook } from "@/src/services/mattermost";

const syncWithConnect = async () => {
  if (process.env.CONNECT_SYNC_ACTIVE !== "true") {
    console.log("La synchronisation n'est pas activée sur cet environnement.");
    return;
  }
  try {
    const startedDate = new Date();
    console.log("Récupération des utilisateurs depuis la dernière synchronisation...");

    const usersAndProjectsFromLastSync = await getUsersAndProjectsFromLastSync({
      service: "connect",
    });

    if (!usersAndProjectsFromLastSync.length) {
      console.log("Aucune nouvelle donnée à synchroniser.");
      await saveCronJob(startedDate, new Date(), "SYNC_CONNECT");
      process.exit(0);
    }

    const activeUsersAndProjects = usersAndProjectsFromLastSync.map((user) => ({
      ...user,
      projets: user.projets.filter((p) => !p.projet.deleted_at),
    }));

    console.log("Début de la synchronisation avec Connect...");
    const connectContacts = activeUsersAndProjects.map(mapUserToConnectContact);
    const connectResult = await batchSyncConnectContacts(connectContacts);

    if (!connectResult.success) {
      captureError("Erreur lors de la synchronisation avec Connect:", {
        errors: connectResult.errors,
      });
      const webhookData = makeConnectSyncBatchErrorWebhookData("Erreur lors du batch de synchronisation Connect.");
      await sendMattermostWebhook(webhookData, "batch", 5000);
      process.exit(1);
    }
    const webhookData = makeConnectSyncBatchWebhookData("Synchronisation avec Connect réussie !");
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
