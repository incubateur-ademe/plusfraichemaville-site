import { getAideSubmissionDeadlineAndName } from "../helpers";
import { AideProjetCardWarningRemainingDays } from "./aide-projet-card-warning-remaining-day";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import clsx from "clsx";
import { Separator } from "@/src/components/common/separator";

import CustomAccordion from "@/src/components/common/CustomAccordion";

type AideEstimationsCardDeadlineProps = {
  aides: { aide: { submission_deadline: Date | null; name: string | null } }[];
  ariaId: string;
};

export const AideProjetCardDeadline = ({ aides, ariaId }: AideEstimationsCardDeadlineProps) => {
  const aideDeadlineAndName = getAideSubmissionDeadlineAndName(aides);

  return (
    <CustomAccordion
      title={`Mes échéances de candidature (${aideDeadlineAndName.length})`}
      ariaId={`accordion-echeances-${ariaId}`}
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
                    <AideProjetCardWarningRemainingDays
                      submissionDeadline={new Date(aideDeadline.submission_deadline)}
                      className="mr-4 inline-block"
                      size="large"
                    />
                    <span className="align-middle">
                      Échéance : {dateToStringWithoutTime(aideDeadline.submission_deadline)}
                    </span>
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
