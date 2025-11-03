import { PropsWithChildren } from "react";

type TabProps = {
  className?: string;
} & PropsWithChildren;

export const TableauDeBordTab = ({ className, children }: TabProps) => {
  return <div className={className}>{children}</div>;
};
