import { FicheDiagnostic } from "@/components/fiches-diagnostic/fiche-diagnostic";
import { getFicheDiagnosticBySlug } from "@/lib/strapi/queries/fiches-diagnostic-queries";

export default async function FicheDiagnosticPage() {
  const ficheDiagnostic = await getFicheDiagnosticBySlug("classification-geoclimatique");

  // TODO: handle fiche non dispo
  if (!ficheDiagnostic) {
    return null;
  }
  return <FicheDiagnostic ficheDiagnostic={ficheDiagnostic} />;
}
