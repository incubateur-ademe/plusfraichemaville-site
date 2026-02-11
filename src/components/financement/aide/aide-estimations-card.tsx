import { dateToStringWithTime } from "@/src/helpers/dateUtils";
import { EstimationWithAidesDto } from "@/src/types/dto";
import { PropsWithChildren } from "react";

import { Separator } from "@/src/components/common/separator";
import { AideEstimationsCardDeadline } from "./aide-estimations-card-deadline";

type AideEstimationsCardProps = {
  estimation: EstimationWithAidesDto;
} & PropsWithChildren;

export const AideEstimationsCard = ({ estimation, children }: AideEstimationsCardProps) => {
  const ea = estimation.estimationsAides;
  const hasSubmissionDeadline = ea.some((item) => item.aide.submissionDeadline) && ea.length > 0;

  return (
    <div className="pfmv-card no-shadow relative mb-8 w-full p-8 hover:outline-none">
      <h2 className="mb-1 text-[22px] text-pfmv-navy">
        {`Estimation du ${dateToStringWithTime(new Date(estimation.createdAt))}`}
      </h2>
      <span className="mb-6 block text-black">Solutions pour lesquelles vous recherchez des financements</span>
      <Separator className="mb-4 h-px !opacity-100" />
      {children}
      {hasSubmissionDeadline && <AideEstimationsCardDeadline estimationsAides={ea} />}
    </div>
  );
};
