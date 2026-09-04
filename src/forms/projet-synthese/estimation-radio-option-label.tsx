"use client";

import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { dateToStringWithTime } from "@/src/helpers/dateUtils";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { useEstimationFSGlobalPrice } from "@/src/hooks/use-estimation-fs-global-price";

type EstimationRadioOptionLabelProps = {
  estimation: EstimationWithAides;
};

export const EstimationRadioOptionLabel = ({ estimation }: EstimationRadioOptionLabelProps) => {
  const { fournitureMin, fournitureMax, isLoading } = useEstimationFSGlobalPrice(
    estimation.estimations_fiches_solutions,
  );

  const date =
    typeof estimation.created_at === "string" ? new Date(estimation.created_at) : estimation.created_at;

  const dateStr = `Estimation du ${dateToStringWithTime(date)}`;

  if (isLoading) {
    return <span>{dateStr}</span>;
  }

  if (fournitureMin != null && fournitureMax != null) {
    return (
      <span>
        {dateStr} (entre {formatNumberWithSpaces(fournitureMin)} et {formatNumberWithSpaces(fournitureMax)} €)
      </span>
    );
  }

  return <span>{dateStr}</span>;
};
