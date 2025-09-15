"use client";
import { PropsWithChildren } from "react";
import { FicheDiagnosticDescriptionModal } from "@/src/components/fiches-diagnostic/fiche-diagnostic-description-modal";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <>
      {children}
      <FicheDiagnosticDescriptionModal />
    </>
  );
}
