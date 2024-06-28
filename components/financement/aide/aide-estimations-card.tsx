import { dateToStringWithTime } from "@/helpers/dateUtils";
import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { PropsWithChildren } from "react";

import { Separator } from "@/components/common/separator";
import { AideEstimationsCardDeadline } from "./aide-estimations-card-deadline";

type AideEstimationsCardProps = {
  estimation: EstimationWithAides;
} & PropsWithChildren;

export const AideEstimationsCard = ({ estimation, children }: AideEstimationsCardProps) => {
  const ea = estimation.estimations_aides;
  const hasSubmissionDeadline = ea.some((item) => item.aide.submission_deadline) && ea.length > 0;

  return (
    <div className="pfmv-card no-shadow relative mb-8 w-full p-8 hover:outline-none">
      <h2 className="mb-1 text-[22px] text-pfmv-navy">
        {`Estimation du ${dateToStringWithTime(estimation.created_at)}`}
      </h2>
      <span className="mb-6 block text-black">Solutions pour lesquelles vous recherchez des financements</span>
      <Separator className="mb-4 h-px !opacity-100" />
      {children}
      {hasSubmissionDeadline && (
        <>
          <div className="mb-4 mt-6 flex items-center gap-3">
            <i className="ri-calendar-2-fill size-4 text-pfmv-navy before:!size-4 before:!align-[0px]"></i>
            {ea.length && <h3 className="mb-0 text-[22px] text-pfmv-navy">Mes échéances de candidature</h3>}
          </div>
          <Separator className="h-px !opacity-100" />
          <AideEstimationsCardDeadline estimationsAides={ea} />
        </>
      )}
    </div>
  );
};
