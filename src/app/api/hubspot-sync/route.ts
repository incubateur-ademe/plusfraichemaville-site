import { getUsersAndProjectsFromLastSync, saveLastCronJob } from "@/src/lib/prisma/prisma-cron-jobs-queries";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { hubspotBatchSync } from "@/src/services/hubspot";

type HubspotError = {
  body: {
    status: string;
    message: string;
    correlationid: string;
  };
};

export async function POST() {
  const authorization = headers().get("authorization");
  if (authorization !== `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const usersAndProjectsFromLastSync = await getUsersAndProjectsFromLastSync();

  try {
    const batch = await hubspotBatchSync(usersAndProjectsFromLastSync);

    if (
      batch.contactBatch.status === "COMPLETE" &&
      batch.projectBatch.status === "COMPLETE" &&
      batch.associationsBatch.status === "COMPLETE"
    ) {
      saveLastCronJob(batch.associationsBatch.startedAt, batch.associationsBatch.completedAt);
      return NextResponse.json({ message: "Synchronsation avec Hubspot réussie" }, { status: 200 });
    } else {
      captureError("Erreur lors de la synchronsation avec Hubspot", {
        executionTime: batch.projectBatch.completedAt,
      });
      return NextResponse.json(
        { message: `Erreur lors de la synchronsation avec Hubspot du ${batch.projectBatch.completedAt}` },
        { status: 400 },
      );
    }
  } catch (error) {
    const err = error as HubspotError;
    captureError("Erreur lors de la synchronisation.", {
      id: err.body.correlationid,
      hubspotMessage: err.body.message,
    });
    return NextResponse.json({ message: "Erreur lors de la synchronisation." }, { status: 500 });
  }
}
