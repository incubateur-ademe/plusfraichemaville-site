"use client";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { EstimationCardPriceInfoCompleted } from "@/src/components/estimation/estimation-card-price-info-completed";

export const EstimationCardPriceInfo = ({ estimationInfo }: { estimationInfo?: EstimationFicheSolution }) => {
  if (!estimationInfo) {
    return <div className="min-h-[2.5rem] text-sm font-bold text-dsfr-text-error">Non complétée</div>;
  } else {
    return <EstimationCardPriceInfoCompleted estimationInfo={estimationInfo} />;
  }
};
