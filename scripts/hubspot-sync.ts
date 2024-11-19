import { getUsersAndProjectsFromLastSync, saveCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { hubspotBatchSync } from "@/src/services/hubspot";
import { archiveHubspotDeals } from "@/src/services/hubspot/hubspot-helpers";

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

    console.log("Début de la synchronisation avec Hubspot...");

    const activeUsersAndProjects = usersAndProjectsFromLastSync.map((user) => ({
      ...user,
      projets: user.projets.filter((p) => !p.projet.deleted_at),
    }));

    const batch = await hubspotBatchSync(activeUsersAndProjects);

    if (batch.status === "COMPLETE") {
      await saveCronJob(startedDate, new Date(), "SYNC_HUBSPOT");
      console.log("Synchronisation avec Hubspot réussie !");
      console.log(batch.message);
      process.exit(0);
    } else {
      captureError("Erreur lors de la synchronisation avec Hubspot.", {
        executionTime: new Date(),
      });
      process.exit(1);
    }
  } catch (error) {
    const err = error as HubspotError;
    customCaptureException("Erreur lors de la synchronisation.", {
      id: err.body?.correlationid,
      hubspotMessage: err.body?.message,
    });
    process.exit(1);
  }
};

syncWithHubspot();
