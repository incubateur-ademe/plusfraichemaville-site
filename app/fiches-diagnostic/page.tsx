import { FicheDiagnostic } from "@/components/fiches-diagnostic/fiche-diagnostic";
import { getAllFichesDiagnostic } from "@/lib/strapi/queries/fiches-diagnostic-queries";

export default async function FichesDiagnosticPage() {
  const fichesDiagnostic = await getAllFichesDiagnostic();

  return <FicheDiagnostic fichesDiagnostic={fichesDiagnostic} />;
}
