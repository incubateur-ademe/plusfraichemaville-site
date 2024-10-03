import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { makeBulkUsersData } from "@/src/services/hubspot/make-bulk-users-data";
import { getNewUsersFromLastSync } from "@/src/lib/prisma/prismaUserQueries";

export async function POST() {
  const authorization = headers().get("authorization");
  if (authorization !== `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const newUsers = await getNewUsersFromLastSync();
  const hubspotData = makeBulkUsersData(newUsers);

  try {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ inputs: hubspotData }),
    });

    console.log("Synchronisation réussie:", response);

    await prismaClient.syncLog.create({
      data: {
        lastSyncDate: new Date(),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la synchronisation:", error);
    captureError(`Erreur lors de la synchronisation.`);
  }
}
