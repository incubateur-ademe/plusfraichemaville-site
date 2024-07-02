import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { getAideSubmissionDeadlineAndName } from "../helpers";
import { AideEstimationsCardWarningRemainingDays } from "./aide-estimations-card-warning-remaining-day";
import { dateToStringWithoutTime } from "@/helpers/dateUtils";
import clsx from "clsx";
import { Separator } from "@/components/common/separator";
import { useState } from "react";

type AideEstimationsCardDeadlineProps = {
  estimationsAides: EstimationWithAides["estimations_aides"];
};

export const AideEstimationsCardDeadline = ({ estimationsAides }: AideEstimationsCardDeadlineProps) => {
  const [show, setShow] = useState(false);
  const aideDeadlineAndName = getAideSubmissionDeadlineAndName(estimationsAides);
  const toggle = () => setShow(!show);
  return (
    <div className="rounded-2xl bg-dsfr-background-alt-blue-france px-6 py-4">
      <div className="flex cursor-pointer items-center gap-3" onClick={toggle}>
        <i className="ri-calendar-2-fill size-4 text-pfmv-navy before:!size-4 before:!align-[0px]"></i>
        {estimationsAides.length && (
          <h3 className="mb-0 flex w-full items-center justify-between text-[22px] text-pfmv-navy">
            Mes échéances de candidature ({aideDeadlineAndName.length})
            {show ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}
          </h3>
        )}
      </div>

      {show && (
        <ul className="mt-4 p-0">
          {aideDeadlineAndName.map(
            (aideDeadline, index) =>
              aideDeadline.submission_deadline && (
                <li className={clsx("list-none text-lg")} key={index}>
                  <span className="mr-2 inline-block font-bold">{aideDeadline.name} : </span>
                  <span className="block text-pretty">
                    <AideEstimationsCardWarningRemainingDays
                      submissionDeadline={aideDeadline.submission_deadline}
                      className="mr-4 inline-block"
                    />
                    Échéance : {dateToStringWithoutTime(aideDeadline.submission_deadline)}
                  </span>
                  {index !== aideDeadlineAndName.length - 1 && (
                    <Separator className="mb-3 mt-4 bg-dsfr-hover-blue-sun !opacity-10" />
                  )}
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
};
