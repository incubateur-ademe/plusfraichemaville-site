import { FicheDiagnosticComponent } from "@/src/components/fiches-diagnostic/fiche-diagnostic-component";
import { getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

type PageProps = {
  params: Promise<{ ficheDiagnosticSlug: string; projetId: string }>;
  searchParams: Promise<{ utilite?: FicheDiagnosticUtilite }>;
};

export default async function FicheDiagnosticPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const ficheDiagnostic = await getFicheDiagnosticBySlug(resolvedParams.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }

  return <FicheDiagnosticComponent ficheDiagnostic={ficheDiagnostic} overrideUtilite={resolvedSearchParams.utilite} />;
}
