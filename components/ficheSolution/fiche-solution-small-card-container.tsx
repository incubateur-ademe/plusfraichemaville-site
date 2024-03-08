import clsx from "clsx";
import { PropsWithChildren } from "react";

type FicheSolutionSmallCardContainerProps = {
  title?: string;
  subtitle?: string;
  className?: string;
} & PropsWithChildren;

export const FicheSolutionSmallCardContainer = ({
  children,
  title,
  subtitle,
  className,
}: FicheSolutionSmallCardContainerProps) => {
  return (
    <div className={clsx("pt-12 pb-12 px-12", className)}>
      <div className="mb-3 text-2xl font-bold">{title}</div>
      <div className="mb-6 text-lg">{subtitle}</div>
      {children}
    </div>
  );
};
