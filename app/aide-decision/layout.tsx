import React, { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement | null }) {
  return <div className={`aide-decision-background`}>{children}</div>;
}
