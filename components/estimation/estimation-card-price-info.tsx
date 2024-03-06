"use client";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";

export const EstimationCardPriceInfo = ({ estimationInfo }: { estimationInfo?: EstimationMateriauxFicheSolution }) => {
  if (!estimationInfo) {
    return <div className="text-dsfr-text-error text-sm font-bold">Non complétée</div>;
  }
  return (
    <div className="text-sm">
      <div>
        <strong>{`${estimationInfo.coutMinInvestissement} - ${estimationInfo.coutMaxInvestissement} `}</strong> HT
      </div>
      <div className="fr-text-mention--grey">
        {`${estimationInfo.coutMinEntretien} - ${estimationInfo.coutMaxEntretien} HT / an`}
      </div>
    </div>
  );
};
