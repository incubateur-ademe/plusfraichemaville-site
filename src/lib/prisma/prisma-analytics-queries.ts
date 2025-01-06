/* eslint-disable max-len */

import { Analytics, Prisma } from "@prisma/client";
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
type NorthStarQueryRecord = {
  periode: Date | null;
  score: bigint | null;
};

export const getNorthStarStats = async (params: GetNorthStarStatsProps): Promise<NorthStarQueryRecord[]> => {
  return prismaClient.$queryRaw(
    Prisma.sql`with score_table as (select date_trunc(${params.range}, created_at)                                    as date1,
                                           sum(CASE WHEN event_type = 'UPDATE_PROJET_SET_VISIBLE' THEN 1 ELSE -1 END) as score
                                    from pfmv."Analytics"
                                    WHERE event_type in
                                          ('UPDATE_PROJET_SET_VISIBLE',
                                           'UPDATE_PROJET_SET_INVISIBLE')
                                      and created_at >= ${params.dateFrom}
                                    group by 1
                                    order by 1 desc),
                    all_intervals as (SELECT date_trunc(${params.range}, ts) as date1
                                      FROM generate_series(${params.dateFrom}, now(), CONCAT('1 ', ${params.range})::interval) AS ts
                                      group by 1)
               select all_intervals.date1::timestamp::date as "periode",
                      coalesce(score, 0)                   as "score"
               from score_table
                        right outer join all_intervals on all_intervals.date1 = score_table.date1
               order by 1;`,
  );
};
