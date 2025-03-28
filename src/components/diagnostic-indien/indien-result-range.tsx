import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { IndienType } from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import IndienCoeffExplanationModal from "@/src/components/diagnostic-indien/indien-coeff-explanation-modal";

export default function IndienResultRange({
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
  return (
      <div className={clsx("rounded-2xl bg-white p-4", className)}>
        <IndienCoeffExplanationModal coefficient={coefficient} />
        <div className="mr-10 mt-4">
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-2">
              <Image src={coefficient.icone} height={51} width={51} alt="" className={clsx(large ? "h-16" : "h-10")} />
              <div>
                <div className={clsx("text-dsfr-text-mention-grey", !large && "text-xs")}>Coefficient de</div>
                <div className={clsx("font-bold", coefficient.textColor, large ? "text-xl" : "text-xl")}>
                  {coefficient.label}
                </div>
              </div>
            </div>
            <div>
              <span className={clsx("font-bold", large ? "text-6xl" : "text-[2rem]")}>{coefficientValue}</span>
              <span className={clsx(large ? "text-[1.75rem]" : "text-xl")}> / 1</span>
            </div>
          </div>
          {coefficient.scale && (
            <>
              <div className={clsx("relative mb-12", large ? "mt-20" : "mt-8")}>
                <div className="relative h-5 w-full rounded-2xl">
                  <Image src={coefficient.scale?.image} fill alt="" className="rounded-2xl object-cover" />
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
                  {large && (
                    <>
                      <div className="absolute left-[20%] top-6 h-4 border-s border-dsfr-text-mention-grey" />
                      <div className="absolute left-[20%] top-10 -translate-x-2/4 text-sm">0.2</div>
                      <div className="absolute left-[40%] top-6 h-4 border-s border-dsfr-text-mention-grey" />
                      <div className="absolute left-[40%] top-10 -translate-x-2/4 text-sm">0.4</div>
                      <div className="absolute left-[60%] top-6 h-4 border-s border-dsfr-text-mention-grey" />
                      <div className="absolute left-[60%] top-10 -translate-x-2/4 text-sm">0.6</div>
                      <div className="absolute left-[80%] top-6 h-4 border-s border-dsfr-text-mention-grey" />
                      <div className="absolute left-[80%] top-10 -translate-x-2/4 text-sm">0.8</div>
                    </>
                  )}
                  <div className="absolute left-full top-6 h-4 border-s border-dsfr-text-mention-grey" />
                  <div className="absolute left-full top-10 -translate-x-2/4 text-sm">1</div>
                </div>
              </div>
              <div className="flex flex-row justify-between text-sm text-dsfr-text-mention-grey">
                <div className={clsx(large && "max-w-32")}>{coefficient.scale.minLabel}</div>
                <div className={clsx(large && "max-w-32", "text-right")}>{coefficient.scale.maxLabel}</div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
