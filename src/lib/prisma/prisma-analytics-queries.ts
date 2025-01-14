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

export const getNorthStarStats = async (
  params: GetNorthStarStatsProps,
): Promise<{ periode: Date; score: number }[]> => {
  return prismaClient.$queryRaw(
    Prisma.sql`with score_table as (
      select 
        date_trunc(${params.range}, p.created_at) as date1,
        count(distinct p.id) as score
      from pfmv."projet" p
      join pfmv."user_projet" up on p.id = up.projet_id
      join pfmv."User" u on up.user_id = u.id
      WHERE p.created_at >= ${params.dateFrom}
        and p.deleted_at IS NULL
        and u.email NOT LIKE '%@ademe.fr'
        and u.email NOT LIKE '%@beta.gouv.fr'
        and u.email != 'marie.racine@dihal.gouv.fr'
      group by 1
    ),
    all_intervals as (
      SELECT date_trunc(${params.range}, ts) as date1
      FROM generate_series(${params.dateFrom}, now(), CONCAT('1 ', ${params.range})::interval) AS ts
    )
    select 
      all_intervals.date1::timestamp::date as "periode",
      coalesce(score, 0) as "score"
    from score_table
    right outer join all_intervals on all_intervals.date1 = score_table.date1
    order by 1;`,
  );
};
