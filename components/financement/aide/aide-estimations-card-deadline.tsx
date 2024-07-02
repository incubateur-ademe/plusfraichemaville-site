import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { getAideSubmissionDeadlineAndName } from "../helpers";
import { AideEstimationsCardWarningRemainingDays } from "./aide-estimations-card-warning-remaining-day";
import { dateToStringWithoutTime } from "@/helpers/dateUtils";
import clsx from "clsx";
import { Separator } from "@/components/common/separator";
import React from "react";
import CustomAccordion from "@/components/common/CustomAccordion";

type AideEstimationsCardDeadlineProps = {
  estimationsAides: EstimationWithAides["estimations_aides"];
};

export const AideEstimationsCardDeadline = ({ estimationsAides }: AideEstimationsCardDeadlineProps) => {
  const aideDeadlineAndName = getAideSubmissionDeadlineAndName(estimationsAides);

  return (
    <CustomAccordion
      title={`Mes échéances de candidature (${estimationsAides.length})`}
      ariaId={`accordion-echeances-${estimationsAides[0].estimationId}`}
      expanded={false}
      className="mb-[14px] mt-4 rounded-2xl [&>h3>button]:!text-pfmv-navy"
      bgColor="!bg-dsfr-background-alt-blue-france"
      picto={<i className="ri-calendar-2-fill mr-2 size-5 text-pfmv-navy before:!size-5 before:!align-[0px]"></i>}
    >
      <div className="mb-2 mt-4 flex flex-col gap-4">
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
      </div>
    </CustomAccordion>
  );
};
