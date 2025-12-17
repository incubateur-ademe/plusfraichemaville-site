"use client";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { useEstimationFSGlobalPrice } from "@/src/hooks/use-estimation-fs-global-price";

export const EstimationCardPriceInfoCompleted = ({ estimationInfo }: { estimationInfo: EstimationFicheSolution }) => {
  const { fournitureMin, fournitureMax, entretienMin, entretienMax, isLoading } = useEstimationFSGlobalPrice([
    estimationInfo,
  ]);

  return (
    <div className="text-sm">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="mb-3 h-4 w-3/4 rounded-md bg-dsfr-contrast-grey"></div>
          <div className="h-4 w-3/4 rounded-md bg-dsfr-contrast-grey"></div>
        </div>
      ) : (
        <>
          <div>
            <strong>{`${formatNumberWithSpaces(fournitureMin)} - ${formatNumberWithSpaces(fournitureMax)} € `}</strong>
            HT
          </div>
          <div className="text-dsfr-text-mention-grey">
            {`${formatNumberWithSpaces(entretienMin)} - ${formatNumberWithSpaces(entretienMax)} € HT / an`}
          </div>
        </>
      )}
    </div>
  );
};
