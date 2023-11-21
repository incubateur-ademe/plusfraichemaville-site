import React, { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement | null }) {
  return <div className={`fr-container`}>{children}</div>;
}
