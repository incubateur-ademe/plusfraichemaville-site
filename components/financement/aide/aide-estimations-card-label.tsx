import clsx from "clsx";
import { PropsWithChildren } from "react";

type AideEstimationsCardLabelProps = {
  isLoading?: boolean;
} & PropsWithChildren;

export const AideEstimationsCardLabel = ({ children, isLoading }: AideEstimationsCardLabelProps) => {
  return (
    <div
      className={clsx(
        "h-[1.8rem] rounded-2xl border-[1px] border-dsfr-background-contrast-grey-hover px-3 py-1 text-sm",
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
