import clsx from "clsx";

export const Separator = ({ className }: { className?: string }) => (
  <div className={clsx("h-[2px] bg-dsfr-border-default-grey opacity-40", className)}></div>
);

export const SeparatorY = ({ className }: { className?: string }) => (
  <div className={clsx("w-[1px] bg-dsfr-border-default-grey opacity-70", className)}></div>
);
