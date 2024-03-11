"use client";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";

export const EstimationCardPriceInfo = ({ estimationInfo }: { estimationInfo?: EstimationMateriauxFicheSolution }) => {
  if (!estimationInfo) {
    return <div className="text-dsfr-text-error text-sm font-bold min-h-[2.5rem]">Non complétée</div>;
  }
  return (
    <div className="text-sm">
      <div>
        <strong>{`${estimationInfo.coutMinInvestissement} - ${estimationInfo.coutMaxInvestissement} €`}</strong> HT
      </div>
      <div className="text-dsfr-text-mention-grey">
        {`${estimationInfo.coutMinEntretien} - ${estimationInfo.coutMaxEntretien} € HT / an`}
      </div>
    </div>
  );
};
