import { FicheDiagnosticComponent } from "@/src/components/fiches-diagnostic/fiche-diagnostic-component";
import { getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_DIAG_FICHE } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-diag";

import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

type PageProps = {
  params: Promise<{ ficheDiagnosticSlug: string; projetId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const ficheDiagnostic = await getFicheDiagnosticBySlug(resolvedParams.ficheDiagnosticSlug);
  return computeMetadata(ficheDiagnostic?.attributes.titre || "Fiche diagnostic");
}

export default async function FicheDiagnosticPage({ params }: PageProps) {
  const resolvedParams = await params;

  const ficheDiagnostic = await getFicheDiagnosticBySlug(resolvedParams.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_FICHE} />
      <FicheDiagnosticComponent ficheDiagnostic={ficheDiagnostic} />
    </>
  );
}
