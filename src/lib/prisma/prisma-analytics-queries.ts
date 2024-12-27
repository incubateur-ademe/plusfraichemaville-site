import { Analytics } from "@prisma/client";
import { prismaClient } from "./prismaClient";
import { northStarStatQuery } from "@prisma/client/sql";
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
type NorthStarQueryRecord = {
  periode: Date | null;
  score: bigint | null;
};

export const getNorthStarStats = async (params: GetNorthStarStatsProps): Promise<NorthStarQueryRecord[]> => {
  return prismaClient.$queryRawTyped(northStarStatQuery(params.dateFrom, params.range));
};
