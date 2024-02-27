import React, { ReactElement } from "react";
import AppFooter from "@/components/layout/AppFooter";
import { ProjetsStoreProvider } from "@/stores/projets/projets-store-provider";

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <>
      <ProjetsStoreProvider>
        <div className={`pb-40`}>{children}</div>
        <AppFooter />
      </ProjetsStoreProvider>
    </>
  );
}
