import { PropsWithChildren } from "react";

export const TableauDeBordSuiviWithText = ({ children }: PropsWithChildren) => {
  return <span className="text-sm">{children}</span>;
};
