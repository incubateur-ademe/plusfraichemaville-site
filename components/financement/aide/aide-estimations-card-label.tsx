import clsx from "clsx";
import { PropsWithChildren } from "react";

type AideEstimationsCardLabelProps = {
  isLoading?: boolean;
} & PropsWithChildren;

export const AideEstimationsCardLabel = ({ children, isLoading }: AideEstimationsCardLabelProps) => {
  return (
    <div
      className={clsx("h-7 rounded-2xl bg-dsfr-contrast-grey px-3 py-1 text-sm", {
        "w-32 animate-pulse": isLoading,
        "w-fit ": !isLoading,
      })}
    >
      {children}
    </div>
  );
};
