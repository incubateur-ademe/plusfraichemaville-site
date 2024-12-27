import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { add } from "date-fns/add";
import { startOfYear } from "date-fns/startOfYear";
import { startOfMonth } from "date-fns/startOfMonth";
import { startOfWeek } from "date-fns/startOfWeek";
import { startOfDay } from "date-fns/startOfDay";
import { getNorthStarStats } from "@/src/lib/prisma/prisma-analytics-queries";
import { fr } from "date-fns/locale/fr";

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

type StatOuput = {
  description?: string;
  stats: StatOutputRecord[];
};

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const parsedRequest = StatsRouteSchema.safeParse(requestBody);
  if (!parsedRequest.success) {
    const { errors } = parsedRequest.error;
    return NextResponse.json({ error: { message: "Invalid request", errors } }, { status: 400 });
  } else {
    const { since: nbIntervals, periodicity } = parsedRequest.data;
    let dateBeginOfLastPeriod = new Date();
    switch (periodicity) {
      case "year":
        dateBeginOfLastPeriod = startOfYear(new Date());
        break;
      case "month":
        dateBeginOfLastPeriod = startOfMonth(new Date());
        break;
      case "week":
        dateBeginOfLastPeriod = startOfWeek(new Date(), { weekStartsOn: 1, locale: fr });
        break;
      case "day":
        dateBeginOfLastPeriod = startOfDay(new Date());
        break;
    }
    dateBeginOfLastPeriod = add(dateBeginOfLastPeriod, {
      minutes: -dateBeginOfLastPeriod.getTimezoneOffset(),
    });

    const dateBeginOfFirstPeriod = add(dateBeginOfLastPeriod, {
      ...(periodicity === "year" && { years: 1 - nbIntervals }),
      ...(periodicity === "month" && { months: 1 - nbIntervals }),
      ...(periodicity === "week" && { weeks: 1 - nbIntervals }),
      ...(periodicity === "day" && { days: 1 - nbIntervals }),
    });
    const results = await getNorthStarStats({ dateFrom: dateBeginOfFirstPeriod, range: periodicity });
    const responseEndpoint: StatOuput = {
      stats: results.map((result) => ({
        value: Number(result.score)!,
        date: result.periode!,
      })),
    };
    return NextResponse.json(responseEndpoint);
  }
}
