import { FicheDiagnosticComponent } from "@/src/components/fiches-diagnostic/fiche-diagnostic-component";
import { getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";

export default async function FicheDiagnosticPage(props: { params: Promise<{ ficheDiagnosticSlug: string }> }) {
  const params = await props.params;
  const ficheDiagnostic = await getFicheDiagnosticBySlug(params.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }
  return <FicheDiagnosticComponent ficheDiagnostic={ficheDiagnostic} />;
}
