import { PropsWithChildren } from "react";

type TabProps = {
  active?: boolean;
} & PropsWithChildren;

export const TableauDeBordTab = ({ active, children }: TabProps) => {
  if (!active) {
    return null;
  }
  return <>{children}</>;
};
