import { SeparatorY } from "@/components/common/separator";
import { Spinner } from "@/components/common/spinner";
import clsx from "clsx";
import Image from "next/image";
import { PropsWithChildren } from "react";

type AideEstimationsCardRecapProps = {
  isLoading: boolean;
  countAides: {
    aideFinanciereCount: number;
    aideTechniqueCount: number;
    verb?: string;
  };
} & PropsWithChildren;

export const AideEstimationsCardRecap = ({ isLoading, countAides, children }: AideEstimationsCardRecapProps) => {
  return (
    <div className={"flex h-24 items-center justify-between rounded-2xl bg-dsfr-background-alt-blue-france px-6 py-3"}>
      <div className="flex gap-8">
        <div className={clsx("flex items-center gap-4", !countAides.aideFinanciereCount && "contrast-0 saturate-0")}>
          <div className="flex gap-2">
            <Image src="/images/financement/financement.svg" width={41} height={38} alt="" />
            <span className={clsx("text-block pt-2 text-[68px] font-bold text-dsfr-background-flat-info")}>
              {isLoading ? (
                <div className="w-[100px]">
                  <Spinner circleColor="text-dsfr-background-flat-info" pathColor="fill-white" />
                </div>
              ) : (
                countAides.aideFinanciereCount
              )}
            </span>
          </div>
          <div>
            <span className="block font-bold text-dsfr-background-flat-info">
              {countAides.aideFinanciereCount > 1 ? "financements" : "financement"}
            </span>
            <span>
              {countAides.aideFinanciereCount > 1 ? `ont été ${countAides.verb}s` : `a été ${countAides.verb}`}
            </span>
          </div>
        </div>
        <SeparatorY />
        <div className={clsx("flex items-center gap-4", !countAides.aideTechniqueCount && "contrast-0 saturate-0")}>
          <div className="flex gap-2">
            <Image src="/images/financement/ingenierie.svg" width={41} height={38} alt="" />
            <span className="text-block pt-2 text-[68px] font-bold text-dsfr-background-flat-orange-terre-battue">
              {isLoading ? (
                <div className="w-[100px]">
                  <Spinner circleColor="text-dsfr-background-flat-orange-terre-battue" pathColor="fill-white" />
                </div>
              ) : (
                countAides.aideTechniqueCount
              )}
            </span>
          </div>
          <div>
            <span className="block font-bold text-dsfr-background-flat-orange-terre-battue">
              {countAides.aideTechniqueCount > 1 ? "soutiens à l'ingénierie" : "soutien à l'ingénierie"}
            </span>
            <span>
              {countAides.aideTechniqueCount > 1 ? `ont été ${countAides.verb}s` : `a été ${countAides.verb}`}
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
