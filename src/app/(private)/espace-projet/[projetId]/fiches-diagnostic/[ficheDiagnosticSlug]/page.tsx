import { FicheDiagnosticComponent } from "@/src/components/fiches-diagnostic/fiche-diagnostic-component";
import { getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

type PageProps = {
  params: { ficheDiagnosticSlug: string };
  searchParams: { utilite?: FicheDiagnosticUtilite };
};

export default async function FicheDiagnosticPage({ params, searchParams }: PageProps) {
  const ficheDiagnostic = await getFicheDiagnosticBySlug(params.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }

  return <FicheDiagnosticComponent ficheDiagnostic={ficheDiagnostic} overrideUtilite={searchParams.utilite} />;
}
