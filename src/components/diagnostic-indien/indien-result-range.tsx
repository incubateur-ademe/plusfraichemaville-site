import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { IndienType } from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";

export default function IndienResultRange({
  coefficient,
  coefficientValue,
  className,
}: {
  coefficient: IndienType;
  coefficientValue: number;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-2xl bg-white p-6", className)}>
      <i className={clsx("ri-information-2-line float-right", coefficient.textColor)} />
      <div className="mr-10 mt-4">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center gap-5">
            <Image src={coefficient.icone} height={51} width={51} alt="" className="h-16" />
            <div>
              <div className="text-dsfr-text-mention-grey">Coefficient de</div>
              <div className={clsx("text-xl font-bold", coefficient.textColor)}>{coefficient.label}</div>
            </div>
          </div>
          <div>
            <span className="text-4xl font-bold">{coefficientValue} </span>/ 1
          </div>
        </div>
        <div className="relative mb-10 mt-20">
          <div className="relative h-5 w-full rounded-2xl">
            <Image src={coefficient.scaleImage} fill alt="" className="rounded-2xl object-cover" />
          </div>
          <Image
            src="/images/fiches-diagnostic/indicateurs-environnementaux/echelle-curseur.svg"
            width={33}
            height={30}
            alt=""
            className="absolute bottom-[0.75rem] ml-[-16px] "
            style={{ left: coefficientValue * 100 + "%" }}
          />
          <div className="top-10 text-dsfr-text-mention-grey">
            <div className="absolute left-0 top-6 h-4 border-s border-dsfr-text-mention-grey" />
            <div className="absolute left-0 top-10 -translate-x-2/4 text-sm">0</div>
            <div className="absolute left-full top-6 h-4 border-s border-dsfr-text-mention-grey" />
            <div className="absolute left-full top-10 -translate-x-2/4 text-sm">1</div>
          </div>
        </div>
        <div className="flex flex-row justify-between text-sm text-dsfr-text-mention-grey">
          <div className="max-w-32">{coefficient.scaleMinLabel}</div>
          <div className="max-w-32 text-right">{coefficient.scaleMaxLabel}</div>
        </div>
      </div>
    </div>
  );
}
