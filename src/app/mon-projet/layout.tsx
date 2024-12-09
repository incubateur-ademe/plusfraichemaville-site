import { ReactElement } from "react";
import AppFooter from "@/src/components/layout/AppFooter";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Votre sélection");

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <>
      <div className={"pb-40"}>{children}</div>
      <AppFooter />
    </>
  );
}
