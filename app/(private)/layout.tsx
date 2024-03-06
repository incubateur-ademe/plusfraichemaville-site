import React, { ReactElement } from "react";
import AppFooter from "@/components/layout/AppFooter";
import { UseBookmarkedFichesSolutions } from "@/hooks/use-bookmark-fiches-solutions";

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <>
      <div className={"pb-40"}>{children}</div>
      <UseBookmarkedFichesSolutions />
      <AppFooter />
    </>
  );
}
