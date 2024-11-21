import clsx from "clsx";
import { PropsWithChildren } from "react";

type SourcingFiltersProps = {
  className?: string;
} & PropsWithChildren;

export const SourcingFilters = ({ className, children }: SourcingFiltersProps) => {
  return (
    <div className={clsx(className)}>
      <div className="absolute z-[9999]">
        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  );
};
