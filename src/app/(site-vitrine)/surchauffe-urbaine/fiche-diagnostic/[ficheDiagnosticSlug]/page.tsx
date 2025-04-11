import { FicheDiagnosticComponent } from "@/src/components/fiches-diagnostic/fiche-diagnostic-component";
import { getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";
import React from "react";

type PageProps = {
  params: Promise<{ ficheDiagnosticSlug: string; projetId: string }>;
};

export default async function FicheDiagnosticSiteVitrinePage({ params }: PageProps) {
  const resolvedParams = await params;

  const ficheDiagnostic = await getFicheDiagnosticBySlug(resolvedParams.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }

  return (
    <>
      <FicheDiagnosticComponent ficheDiagnostic={ficheDiagnostic} />
    </>
  );
}
