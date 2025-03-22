import Image from "next/image";
import React from "react";
import clsx from "clsx";
import {
  getRangeFromValue,
  INDIEN_CANOPEE,
  IndienType,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import { Separator } from "@/src/components/common/separator";

export default function IndienResultExplanation({
  coefficient,
  coefficientValue,
  className,
}: {
  coefficient: IndienType;
  coefficientValue: number;
  className?: string;
}) {
  const range = getRangeFromValue(coefficientValue, coefficient);
  return (
    <div className={className}>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Image src={coefficient.icone} height={51} width={51} alt="" className="h-10" />
          <div className={clsx("text-xl font-bold", coefficient.textColor)}>{range.title}</div>
        </div>
        <div>
          {coefficient.label === INDIEN_CANOPEE.label ? (
            <>
              <span className="text-3xl font-bold">{coefficientValue} </span> %
            </>
          ) : (
            <>
              <span className="text-3xl font-bold">{coefficientValue} </span>/ 1
            </>
          )}
        </div>
      </div>
      <Separator className="mb-4 mt-2" />
      {range.explanation}
    </div>
  );
}
