import clsx from "clsx";

const RedAsterisk = ({ className }: { className?: string }) => (
  <span className={clsx("text-dsfr-text-error", className)}>*</span>
);

export default RedAsterisk;
