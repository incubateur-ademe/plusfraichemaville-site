import clsx from "clsx";
import { PropsWithChildren } from "react";

type AideProjetCardLabelProps = {
  isLoading?: boolean;
} & PropsWithChildren;

export const AideProjetCardLabel = ({ children, isLoading }: AideProjetCardLabelProps) => {
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
