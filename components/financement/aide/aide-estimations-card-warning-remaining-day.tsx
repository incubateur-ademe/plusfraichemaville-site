import { daysUntilDate } from "@/helpers/common";
import clsx from "clsx";

export const AideEstimationsCardWarningRemainingDays = ({
  submissionDeadline,
  className,
}: {
  submissionDeadline: Date;
  className?: string;
}) => {
  return (
    daysUntilDate(submissionDeadline) && (
      <div
        className={clsx(
          className,
          "bg-dsfr-background-contrast-yellow-tournesol-hover shrink-0",
          "w-fit rounded-[4px] px-[6px] py-[2px] text-sm font-bold text-black",
        )}
      >
        <i className="ri-error-warning-line mr-1 size-4 text-black before:!size-4 before:!align-[-4px]"></i>
        J-{daysUntilDate(submissionDeadline)}
      </div>
    )
  );
};
