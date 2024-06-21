import { dateToStringWithTime } from "@/helpers/dateUtils";
import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { PropsWithChildren } from "react";

type AideEstimationsCardProps = {
  estimation: EstimationWithAides;
} & PropsWithChildren;

export const AideEstimationsCard = ({ estimation, children }: AideEstimationsCardProps) => {
  return (
    <div className="pfmv-card mb-8 w-full p-8 hover:outline-none">
      <h2 className="mb-1 text-[22px] text-pfmv-navy">
        {`Estimation du ${dateToStringWithTime(estimation.created_at)}`}
      </h2>
      <span className="mb-6 block text-black">Solutions pour lesquelles vous recherchez des financements</span>
      {children}
    </div>
  );
};
