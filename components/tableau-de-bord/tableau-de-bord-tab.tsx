import clsx from "clsx";
import { PropsWithChildren } from "react";

type TabProps = {
  active?: boolean;
} & PropsWithChildren;

export const TableauDeBordTab = ({ active, children }: TabProps) => {
  return <div className={clsx(active ? "block" : "hidden")}>{children}</div>;
};
