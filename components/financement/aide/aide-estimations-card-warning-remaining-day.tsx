import { daysUntilDate } from "@/helpers/common";
import clsx from "clsx";

export const AideEstimationsCardWarningRemainingDays = ({
  submissionDeadline,
  size = "large",
  className,
}: {
  submissionDeadline: Date;
  size: "small" | "large";
  className?: string;
}) => {
  const daysUntilSubmissionDate = daysUntilDate(submissionDeadline);
  if (daysUntilSubmissionDate === null || daysUntilSubmissionDate > 45) {
    return null;
  }
  return (
    <>
      {daysUntilSubmissionDate < 0 ? (
        <div
          className={clsx(
            className,
            "shrink-0 bg-dsfr-orange-warning",
            "w-fit rounded-[4px] py-[4px] pl-1 pr-2 font-bold text-black",
            size === "large" ? "text-sm" : "text-xs",
          )}
        >
          <i className={clsx("ri-close-circle-line mr-1", size === "small" && "fr-icon--sm")}></i>
          Expiré
        </div>
      ) : (
        <div
          className={clsx(
            className,
            "shrink-0 bg-dsfr-background-contrast-yellow-tournesol-hover",
            "w-fit rounded-[4px] py-[4px] pl-1 pr-2 font-bold text-black",
            size === "large" ? "text-sm" : "text-xs",
          )}
        >
          <i className={clsx("ri-error-warning-line mr-1", size === "small" && "fr-icon--sm")}></i>
          J-{daysUntilDate(submissionDeadline)}
        </div>
      )}
    </>
  );
};
