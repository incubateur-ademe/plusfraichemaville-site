import React, { ReactElement } from "react";
import AppFooter from "@/components/layout/AppFooter";

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <>
      <div>{children}</div>
      <AppFooter />
    </>
  );
}
