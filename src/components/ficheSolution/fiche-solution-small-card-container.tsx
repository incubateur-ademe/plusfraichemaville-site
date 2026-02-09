import clsx from "clsx";
import { PropsWithChildren } from "react";

type FicheSolutionSmallCardContainerProps = {
  title?: string;
  className?: string;
} & PropsWithChildren;

export const FicheSolutionSmallCardContainer = ({
  children,
  title,
  className,
}: FicheSolutionSmallCardContainerProps) => {
  return (
    <div className={clsx("px-12 pb-12 pt-8", className)}>
      <div className="mb-6 text-lg">{title}</div>
      {children}
    </div>
  );
};
