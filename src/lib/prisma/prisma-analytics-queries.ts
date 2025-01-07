/* eslint-disable max-len */

import { Analytics } from "@prisma/client";
import { prismaClient } from "./prismaClient";
import { DateRange } from "@/src/helpers/dateUtils";

type AnalyticsProps = Omit<Analytics, "id" | "created_at" | "created_by">;

export const createAnalytic = async (analytics: AnalyticsProps): Promise<Analytics | null> => {
  return prismaClient.analytics.create({
    data: {
      reference_id: analytics.reference_id,
      reference_type: analytics.reference_type,
      event_type: analytics.event_type,
      context: analytics.context ?? {},
      user_id: analytics.user_id,
    },
  });
};

type GetNorthStarStatsProps = {
  dateFrom: Date;
  range: DateRange;
};

export const getNorthStarStats = async (
  dateFrom: GetNorthStarStatsProps["dateFrom"],
): Promise<
  {
    created_at: Date;
  }[]
> => {
  const projets = await prismaClient.projet.findMany({
    where: {
      deleted_at: null,
      created_at: {
        gte: dateFrom,
      },
      creator: {
        NOT: [
          {
            email: {
              contains: "@ademe.fr",
            },
          },
          {
            email: {
              contains: "@beta.gouv.fr",
            },
          },
          {
            email: "marie.racine@dihal.gouv.fr",
          },
        ],
      },
    },
    select: {
      created_at: true,
    },
  });

  return projets;
};
