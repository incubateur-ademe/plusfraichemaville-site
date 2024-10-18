import { getUsersAndProjectsFromLastSync, saveLastCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { hubspotBatchSync } from "@/src/services/hubspot";

type HubspotError = {
  body: {
    status: string;
    message: string;
    correlationid: string;
  };
};

const syncWithHubspot = async () => {
  try {
    console.log("Récupération des utilisateurs et projets depuis la dernière synchronisation...");
    const usersAndProjectsFromLastSync = await getUsersAndProjectsFromLastSync();

    if (!usersAndProjectsFromLastSync.length) {
      console.log("Aucune nouvelle donnée à synchroniser.");
      process.exit(0);
    }

    console.log("Début de la synchronisation avec Hubspot...");
    const batch = await hubspotBatchSync(usersAndProjectsFromLastSync);

    if (
      batch.contactBatch.status === "COMPLETE" &&
      batch.projectBatch.status === "COMPLETE" &&
      batch.associationsBatch.status === "COMPLETE"
    ) {
      await saveLastCronJob(batch.associationsBatch.startedAt, batch.associationsBatch.completedAt);
      console.log("Synchronisation avec Hubspot réussie !");
      process.exit(0);
    } else {
      captureError("Erreur lors de la synchronisation avec Hubspot.", {
        executionTime: batch.projectBatch.completedAt,
      });
      console.log(`Erreur lors de la synchronisation avec Hubspot du ${batch.projectBatch.completedAt}`);
      process.exit(1);
    }
  } catch (error) {
    const err = error as HubspotError;
    captureError("Erreur lors de la synchronisation.", {
      id: err.body?.correlationid,
      hubspotMessage: err.body?.message,
    });
    console.log("Erreur lors de la synchronisation.", error);
    process.exit(1);
  }
};

syncWithHubspot();
