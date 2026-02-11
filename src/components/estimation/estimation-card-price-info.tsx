"use client";
import { EstimationFicheSolutionDto } from "@/src/types/dto";
import { EstimationCardPriceInfoCompleted } from "@/src/components/estimation/estimation-card-price-info-completed";
import { isFicheSolutionEstimated } from "@/src/helpers/estimation";

export const EstimationCardPriceInfo = ({ estimationInfo }: { estimationInfo?: EstimationFicheSolutionDto }) => {
  if (!estimationInfo || !isFicheSolutionEstimated(estimationInfo)) {
    return <div className="min-h-[2.5rem] text-sm font-bold text-dsfr-text-error">Non complétée</div>;
  } else {
    return <EstimationCardPriceInfoCompleted estimationInfo={estimationInfo} />;
  }
};
