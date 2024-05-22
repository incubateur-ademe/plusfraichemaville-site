import clsx from "clsx";

export const Separator = ({ className }: { className?: string }) => (
  <div className={clsx("bg-dsfr-border-default-grey h-[2px] opacity-40", className)}></div>
);

export const SeparatorY = ({ className }: { className?: string }) => (
  <div className={clsx("bg-dsfr-border-default-grey w-[1px] opacity-70", className)}></div>
);
