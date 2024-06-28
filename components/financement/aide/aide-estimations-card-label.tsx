import clsx from "clsx";
import { PropsWithChildren } from "react";

type AideEstimationsCardLabelProps = {
  isLoading?: boolean;
} & PropsWithChildren;

export const AideEstimationsCardLabel = ({ children, isLoading }: AideEstimationsCardLabelProps) => {
  return (
    <div
      className={clsx(
        "border-dsfr-background-contrast-grey-hover h-[1.9rem] rounded-2xl border-[1px] px-3 py-1 text-sm",
        {
          "w-32 animate-pulse": isLoading,
          "w-fit ": !isLoading,
        },
      )}
    >
      {children}
    </div>
  );
};
