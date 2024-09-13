import { daysUntilDate } from "@/helpers/common";
import clsx from "clsx";

export const AideEstimationsCardWarningRemainingDays = ({
  submissionDeadline,
  size,
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
    <div
      className={clsx(
        className,
        "w-fit shrink-0 rounded-[4px] py-[4px] pl-1 pr-2 font-bold text-black",
        size === "large" ? "text-sm" : "text-xs",
        daysUntilSubmissionDate < 0 ? "bg-dsfr-orange-warning" : "bg-dsfr-background-contrast-yellow-tournesol-hover",
      )}
    >
      <i
        className={clsx(
          "mr-1",
          size === "small" && "fr-icon--sm",
          daysUntilSubmissionDate < 0 ? "ri-close-circle-line" : "ri-error-warning-line",
        )}
      />
      {daysUntilSubmissionDate < 0 ? <span>Expiré</span> : <span>J-{daysUntilDate(submissionDeadline)}</span>}
    </div>
  );
};
