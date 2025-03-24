import Image from "next/image";
import React from "react";
import {
  getRangeFromValue,
  INDIEN_CANOPEE,
  IndienType,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import { Separator } from "@/src/components/common/separator";
import clsx from "clsx";

export default function IndienResultExplanation({
  coefficient,
  coefficientValue,
  className,
  large = false,
}: {
  coefficient: IndienType;
  coefficientValue: number;
  className?: string;
  large?: boolean;
}) {
  const range = getRangeFromValue(coefficientValue, coefficient);
  return (
    <div className={className}>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          <Image src={coefficient.icone} height={51} width={51} alt="" className="h-10" />
          <div className={clsx("font-bold", large && "text-xl")}>{range.title}</div>
        </div>
        <div>
          {coefficient.label === INDIEN_CANOPEE.label ? (
            <>
              <span className="text-2xl font-bold">{coefficientValue} </span> %
            </>
          ) : (
            <>
              <span className={clsx("font-bold", large ? "text-4xl" : "text-3xl")}>{coefficientValue} </span>/ 1
            </>
          )}
        </div>
      </div>
      <Separator className="mb-4 mt-2" />
      {range.explanation}
    </div>
  );
}
