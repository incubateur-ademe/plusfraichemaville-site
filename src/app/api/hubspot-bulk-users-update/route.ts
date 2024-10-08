import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { prismaClient } from "@/src/lib/prisma/prismaClient";

import { getUpsertedUsersFromLastSync } from "@/src/lib/prisma/prismaUserQueries";
import { batchUpdateHubspotContacts } from "@/src/services/hubspot";
import { getUpsertedProjectsFromLastSync } from "@/src/lib/prisma/prismaProjetQueries";

export async function POST() {
  const authorization = headers().get("authorization");
  if (authorization !== `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const newUsers = await getUpsertedUsersFromLastSync();
  const newProjects = await getUpsertedProjectsFromLastSync();
  console.log(newProjects);

  try {
    const response = await batchUpdateHubspotContacts(newUsers);

    if (response.status === "COMPLETE") {
      await prismaClient.cron_jobs.create({
        data: {
          execution_start_time: response.startedAt,
          execution_end_time: response.completedAt,
          job_type: "SYNC_HUBSPOT",
        },
      });
      return NextResponse.json({ message: "Synchronsation avec Hubspot réussie" }, { status: 200 });
    } else {
      captureError("Erreur lors de la synchronsation avec Hubspot", { date: response.startedAt });
      return NextResponse.json(
        { message: `Erreur lors de la synchronsation avec Hubspot du ${response.completedAt}` },
        { status: 400 },
      );
    }
  } catch (error) {
    captureError("Erreur lors de la synchronisation.");
    return NextResponse.json({ message: "Erreur lors de la synchronisation." }, { status: 500 });
  }
}
