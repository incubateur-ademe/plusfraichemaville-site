"use client";
import { ReactElement } from "react";
import { FicheDiagnosticDescriptionModal } from "@/src/components/fiches-diagnostic/fiche-diagnostic-description-modal";

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <>
      {children}
      <FicheDiagnosticDescriptionModal />
    </>
  );
}
