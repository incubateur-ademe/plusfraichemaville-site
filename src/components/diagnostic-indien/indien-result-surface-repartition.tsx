import React from "react";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import {
  INDIEN_QUESTION_GROUPE_BASSIN,
  INDIEN_QUESTION_GROUPE_REVETEMENT_SOL,
  INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE,
  INDIEN_QUESTION_GROUPE_TOITURE,
} from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";
import { PieChart } from "react-minimal-pie-chart";
import orderBy from "lodash/orderBy";
import clsx from "clsx";
import { isEmpty } from "@/src/helpers/listUtils";

export default function IndienResultPieChartSurface({
  results,
  className,
}: {
  results: ProjetIndiEnSimuation;
  className?: string;
}) {
  const pieChartData = orderBy(
    [
      {
        title: INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE.label,
        value: results.partSurfaceVegetalisee,
        color: "#00A95F",
      },
      { title: INDIEN_QUESTION_GROUPE_TOITURE.label, value: results.partToiture, color: "#B7B7D5" },
      { title: INDIEN_QUESTION_GROUPE_REVETEMENT_SOL.label, value: results.partRevetementSol, color: "#68687B" },
      { title: INDIEN_QUESTION_GROUPE_BASSIN.label, value: results.partFontainerie, color: "#3B87FF" },
    ],
    "value",
    "desc",
  ).filter((data) => data.value != 0);

  if (isEmpty(pieChartData)) {
    return null;
  }

  return (
    <div className={clsx(className, "flex flex-col items-center gap-2 md:flex-row md:gap-10")}>
      <div>
        <PieChart data={pieChartData} className="w-32" />
      </div>
      <div className="flex flex-col gap-1">
        {pieChartData.map((data) => (
          <div key={data.title} className={"flex items-center"}>
            <span className={"mr-2 inline-block h-4 w-4"} style={{ backgroundColor: data.color }} />
            {data.title} : <strong>{data.value} %</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
