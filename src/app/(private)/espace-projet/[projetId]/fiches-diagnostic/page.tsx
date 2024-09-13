import { FichesDiagnosticProjetHeader } from "@/components/fiches-diagnostic/fiche-diagnostic-projet-header";
import { FicheDiagnosticProjetListe } from "@/components/fiches-diagnostic/fiche-diagnostic-projet-liste";

export default async function FicheDiagnosticSelectionPage() {
  return (
    <div className="fr-container py-10">
      <FichesDiagnosticProjetHeader />
      <FicheDiagnosticProjetListe />
    </div>
  );
}
