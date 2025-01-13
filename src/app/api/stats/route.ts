import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { add } from "date-fns/add";
import { getNorthStarStats } from "@/src/lib/prisma/prisma-analytics-queries";
import { DateRange, getBeginningDateOfRange } from "@/src/helpers/dateUtils";

const StatsRouteSchema = z.object({
  since: z
    .number()
    .positive()
    .max(5000, { message: "Veuillez rentrer une valeur inférieure à 5000 pour le paramètre since" }),
  periodicity: z.enum(["year", "month", "week", "day"]),
});

interface StatOutputRecord {
  value: number;
  date: Date;
}

type StatOutput = {
  description?: string;
  stats: StatOutputRecord[];
};

type GetNorthStarStatsProps = {
  dateFrom: Date;
  range: DateRange;
};

export async function GET(request: NextRequest) {
  const parsedRequest = StatsRouteSchema.safeParse({
    since: +(request.nextUrl.searchParams.get("since") ?? 0),
    periodicity: request.nextUrl.searchParams.get("periodicity"),
  });
  if (!parsedRequest.success) {
    const { errors } = parsedRequest.error;
    return NextResponse.json({ error: { message: "Invalid request", errors } }, { status: 400 });
  } else {
    const { since: nbIntervals, periodicity } = parsedRequest.data;
    const dateBeginOfLastPeriod = getBeginningDateOfRange(new Date(), periodicity);

    const dateBeginOfLastPeriodWithOffset = add(dateBeginOfLastPeriod, {
      minutes: -dateBeginOfLastPeriod.getTimezoneOffset(),
    });

    const dateBeginOfFirstPeriod = add(dateBeginOfLastPeriodWithOffset, {
      ...(periodicity === "year" && { years: 1 - nbIntervals }),
      ...(periodicity === "month" && { months: 1 - nbIntervals }),
      ...(periodicity === "week" && { weeks: 1 - nbIntervals }),
      ...(periodicity === "day" && { days: 1 - nbIntervals }),
    });
    const results = await getNorthStarStats(dateBeginOfFirstPeriod);
    const computedStats = computeStats({ dateFrom: dateBeginOfFirstPeriod, range: periodicity }, results);

    return NextResponse.json(computedStats);
  }
}

const computeStats = (
  params: GetNorthStarStatsProps,
  projets: {
    created_at: Date;
  }[],
): StatOutput => {
  const statsMap = new Map<string, number>();
  const now = new Date();
  let dateFrom = new Date(params.dateFrom);

  while (dateFrom <= now) {
    statsMap.set(dateFrom.toISOString(), 0);
    switch (params.range) {
      case "day":
        dateFrom = add(dateFrom, { days: 1 });
        break;
      case "week":
        dateFrom = add(dateFrom, { weeks: 1 });
        break;
      case "month":
        dateFrom = add(dateFrom, { months: 1 });
        break;
      case "year":
        dateFrom = add(dateFrom, { years: 1 });
        break;
    }
  }

  projets.forEach((projet) => {
    let periodeDate: Date;
    periodeDate = getBeginningDateOfRange(projet.created_at, params.range);
    const periodeKey = periodeDate.toISOString();
    statsMap.set(periodeKey, (statsMap.get(periodeKey) || 0) + 1);
  });

  const stats = Array.from(statsMap.entries())
    .map(([periode, count]) => ({
      date: new Date(periode),
      value: Number(count),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    stats,
  };
};
