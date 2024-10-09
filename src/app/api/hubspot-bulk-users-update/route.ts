import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { prismaClient } from "@/src/lib/prisma/prismaClient";

import { getUpsertedUsersFromLastSync } from "@/src/lib/prisma/prismaUserQueries";
import { batchUpdateHubspotContacts, batchUpdateHubspotProjectsByUser } from "@/src/services/hubspot";
import { getUpsertedProjectsFromLastSync } from "@/src/lib/prisma/prismaProjetQueries";
import { getUsersAndProjectsFromLastSync } from "@/src/lib/prisma/prisma-cron-jobs-queries";

export async function POST() {
  const authorization = headers().get("authorization");
  if (authorization !== `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // const newUsers = await getUpsertedUsersFromLastSync();
  const t = await getUsersAndProjectsFromLastSync();
  console.log(t);

  const newProjects = await getUpsertedProjectsFromLastSync();

  try {
    // const responseContacts = await batchUpdateHubspotContacts(newUsers);
    const responseProjets = await batchUpdateHubspotProjectsByUser(newProjects);

    if (
      // responseContacts.status === "COMPLETE" &&
      responseProjets.status === "COMPLETE"
    ) {
      // await prismaClient.cron_jobs.create({
      //   data: {
      //     execution_start_time: responseProjets.startedAt,
      //     execution_end_time: responseProjets.completedAt,
      //     job_type: "SYNC_HUBSPOT",
      //   },
      // });
      return NextResponse.json({ message: "Synchronsation avec Hubspot réussie" }, { status: 200 });
    } else {
      captureError("Erreur lors de la synchronsation avec Hubspot", {
        // contactsExecutionTime: responseContacts.completedAt,
        projetsExecutionTime: responseProjets.completedAt,
      });
      return NextResponse.json(
        { message: `Erreur lors de la synchronsation avec Hubspot du ${responseProjets.completedAt}` },
        { status: 400 },
      );
    }
  } catch (error) {
    console.log((error as HubspotError).body);
    captureError("Erreur lors de la synchronisation.");
    return NextResponse.json({ message: "Erreur lors de la synchronisation." }, { status: 500 });
  }
}

type HubspotError = {
  body: {
    status: string;
    message: string;
    correlationid: string;
  };
};
