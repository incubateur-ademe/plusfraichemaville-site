import React, { ReactElement } from "react";
import AppFooter from "@/components/layout/AppFooter";
import { Metadata } from "next";
import { computeMetadata } from "@/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Espace projet");

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <>
      <div className={"pb-40"}>{children}</div>
      <AppFooter />
    </>
  );
}
