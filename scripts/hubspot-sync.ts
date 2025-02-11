import { getUsersAndProjectsFromLastSync, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { hubspotBatchSync } from "@/src/services/hubspot";
import { archiveHubspotDeals } from "@/src/services/hubspot/hubspot-helpers";
import {
  makeBatchErrorWebhookData,
  makeHubspotSyncBatchWebhookData,
} from "@/src/services/mattermost/mattermost-helpers";
import { sendMattermostWebhook } from "@/src/services/mattermost";
import { batchSyncConnectContacts } from "@/src/services/connect";
import { mapUserToConnectContact } from "@/src/services/connect/connect-helpers";

type HubspotError = {
  body: {
    status: string;
    message: string;
    correlationid: string;
  };
};

const syncWithHubspot = async () => {
  if (process.env.HUBSPOT_SYNC_ENV !== "true") {
    console.log("La synchronisation n'a pas aboutie : éxecution hors d'un environnement de production.");
    return;
  }

  try {
    const startedDate = new Date();
    console.log("Récupération des utilisateurs et projets depuis la dernière synchronisation...");
    const usersAndProjectsFromLastSync = await getUsersAndProjectsFromLastSync();

    if (!usersAndProjectsFromLastSync.length) {
      console.log("Aucune nouvelle donnée à synchroniser.");
      await saveCronJob(startedDate, new Date(), "SYNC_HUBSPOT");
      const webhookData = makeHubspotSyncBatchWebhookData("Aucune donnée à traiter.");
      await sendMattermostWebhook(webhookData, "batch", 5000);
      process.exit(0);
    }

    const deletedProjects = usersAndProjectsFromLastSync.flatMap((user) =>
      user.projets.filter((p) => p.projet.deleted_at).map((p) => p.projet.id),
    );

    if (deletedProjects.length > 0) {
      console.log("Archivage des projets supprimés dans Hubspot...");
      const archiveResult = await archiveHubspotDeals(deletedProjects);
      console.log(`Projet(s) archivé(s) : ${archiveResult}`);
    }

    const activeUsersAndProjects = usersAndProjectsFromLastSync.map((user) => ({
      ...user,
      projets: user.projets.filter((p) => !p.projet.deleted_at),
    }));

    console.log("Début de la synchronisation avec Connect...");
    const connectContacts = activeUsersAndProjects.map(mapUserToConnectContact);
    const connectResult = await batchSyncConnectContacts(connectContacts);

    if (!connectResult.success) {
      console.error("Erreurs lors de la synchronisation avec Connect:", connectResult.errors);
      captureError("Erreurs lors de la synchronisation avec Connect", {
        errors: connectResult.errors,
      });
    } else {
      console.log("Synchronisation avec Connect réussie !");
    }

    console.log("Début de la synchronisation avec Hubspot...");

    const batch = await hubspotBatchSync(activeUsersAndProjects);

    if (batch.status === "COMPLETE") {
      await saveCronJob(startedDate, new Date(), "SYNC_HUBSPOT");
      const webhookData = makeHubspotSyncBatchWebhookData(batch.message);
      await sendMattermostWebhook(webhookData, "batch", 5000);
      console.log("Synchronisation avec Hubspot réussie !");
      console.log(batch.message);
      process.exit(0);
    } else {
      captureError("Erreur lors de la synchronisation avec Hubspot.", {
        executionTime: new Date(),
      });
      await sendMattermostWebhook(
        makeBatchErrorWebhookData("Erreur lors du batch de synchronisation Hubspot."),
        "batch",
        5000,
      );
      process.exit(1);
    }
  } catch (error) {
    const err = error as HubspotError;
    customCaptureException("Erreur lors de la synchronisation.", {
      id: err.body?.correlationid,
      hubspotMessage: err.body?.message,
    });
    await sendMattermostWebhook(
      makeBatchErrorWebhookData("Erreur lors du batch de synchronisation Hubspot."),
      "batch",
      5000,
    );
    process.exit(1);
  }
};

syncWithHubspot();
