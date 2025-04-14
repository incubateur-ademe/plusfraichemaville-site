import { FicheDiagnosticComponent } from "@/src/components/fiches-diagnostic/fiche-diagnostic-component";
import { getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";
import React from "react";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
// eslint-disable-next-line max-len
import { BREADCRUMB_SURCHAUFFE_URBAINE_FICHE_DIAG } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

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
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_FICHE_DIAG} />
      </div>
      <FicheDiagnosticComponent ficheDiagnostic={ficheDiagnostic} />
    </>
  );
}
