import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { getAideSubmissionDeadlineAndName } from "../helpers";
import { AideEstimationsCardWarningRemainingDays } from "./aide-estimations-card-warning-remaining-day";
import { dateToStringWithoutTime } from "@/helpers/dateUtils";

type AideEstimationsCardDeadlineProps = {
  estimationsAides: EstimationWithAides["estimations_aides"];
};

export const AideEstimationsCardDeadline = ({ estimationsAides }: AideEstimationsCardDeadlineProps) => {
  const aideDeadlineAndName = getAideSubmissionDeadlineAndName(estimationsAides);

  return (
    <ul className="mt-4 p-0">
      {aideDeadlineAndName.map(
        (aideDeadline, index) =>
          aideDeadline.submission_deadline && (
            <li className="list-none text-lg" key={index}>
              <span className="mr-2 inline-block font-bold">{aideDeadline.name} : </span>
              <span className="text-pretty">
                Échéance : {dateToStringWithoutTime(aideDeadline.submission_deadline)}
                <AideEstimationsCardWarningRemainingDays submissionDeadline={aideDeadline.submission_deadline} />
              </span>
            </li>
          ),
      )}
    </ul>
  );
};