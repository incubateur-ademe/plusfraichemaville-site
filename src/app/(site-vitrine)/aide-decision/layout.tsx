import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement | null }) {
  return <div className={"aide-decision-background -mb-40 pb-40"}>{children}</div>;
}
