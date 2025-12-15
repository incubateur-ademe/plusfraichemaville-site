"use client";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";

export const EstimationCardPriceInfo = ({ estimationInfo }: { estimationInfo?: EstimationFicheSolution }) => {
  if (!estimationInfo) {
    return <div className="min-h-[2.5rem] text-sm font-bold text-dsfr-text-error">Non complétée</div>;
  }
  return (
    <div className="text-sm">
      <div>
        <strong>{`${formatNumberWithSpaces(estimationInfo.coutMinInvestissement)} - ${formatNumberWithSpaces(
          estimationInfo.coutMaxInvestissement,
        )} €`}</strong>{" "}
        HT
      </div>
      <div className="text-dsfr-text-mention-grey">
        {`${formatNumberWithSpaces(estimationInfo.coutMinEntretien)} - ${formatNumberWithSpaces(
          estimationInfo.coutMaxEntretien,
        )} € HT / an`}
      </div>
    </div>
  );
};
