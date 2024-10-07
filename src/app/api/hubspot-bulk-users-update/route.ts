import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { HubspotBulkUsersUpdateResponse } from "@/src/services/hubspot/hubspot-types";
import { getNewUsersFromLastSync } from "@/src/lib/prisma/prismaUserQueries";
import { makeHubspotBulkUsersData } from "@/src/services/hubspot/hubspot-helpers";

export async function POST() {
  const authorization = headers().get("authorization");
  if (authorization !== `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const executionStartTime = new Date();
  const newUsers = await getNewUsersFromLastSync();

  try {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(makeHubspotBulkUsersData(newUsers)),
    });

    const hubspotResponse = (await response.json()) as HubspotBulkUsersUpdateResponse;

    if (hubspotResponse.status === "COMPLETE") {
      const executionEndTime = new Date();
      await prismaClient.cron_jobs.create({
        data: {
          execution_start_time: executionStartTime,
          execution_end_time: executionEndTime,
          job_type: "SYNC_HUBSPOT",
        },
      });
      return NextResponse.json({ message: "Synchronisation réussie" }, { status: 200 });
    } else {
      captureError("Erreur lors de la synchronisation", { id: hubspotResponse.correlationId });
      return NextResponse.json({ message: hubspotResponse.message }, { status: 400 });
    }
  } catch (error) {
    captureError("Erreur lors de la synchronisation.");
    return NextResponse.json({ message: "Erreur lors de la synchronisation." }, { status: 500 });
  }
}
