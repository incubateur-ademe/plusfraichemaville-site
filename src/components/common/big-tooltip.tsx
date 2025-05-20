import clsx from "clsx";
import { PropsWithChildren } from "react";

export const BigTooltip = ({ children, tooltipLabel }: PropsWithChildren<{ tooltipLabel?: string }>) => {
  return (
    <div className={"group relative "}>
      {children}
      <div
        className={clsx(
          "pfmv-big-tooltip absolute left-0 top-full z-10 hidden w-64 -translate-y-1/2 rounded-md",
          " px-5 py-1 text-center text-sm text-black",
          tooltipLabel && "group-hover:block",
        )}
      >
        {tooltipLabel}
      </div>
    </div>
  );
};
