import clsx from "clsx";
import { PropsWithChildren } from "react";

type AideEstimationsCardLabelProps = {
  isLoading?: boolean;
} & PropsWithChildren;

export const AideEstimationsCardLabel = ({ children, isLoading }: AideEstimationsCardLabelProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border-[1px] border-dsfr-background-contrast-grey-hover px-3 py-1 text-sm",
        "bg-dsfr-background-alt-grey",
        isLoading ? "w-32 animate-pulse" : "w-fit",
      )}
    >
      {children}
    </div>
  );
};
