import { Analytics } from "@prisma/client";
import { prismaClient } from "./prismaClient";

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
