import clsx from "clsx";

export const Separator = ({ className }: { className?: string }) => (
  <div className={clsx("bg-dsfr-border-default-grey h-[2px] opacity-40", className)}></div>
);
