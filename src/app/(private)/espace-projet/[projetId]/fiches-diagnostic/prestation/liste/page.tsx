import { FicheDiagnosticNoSelection } from "@/src/components/fiches-diagnostic/fiche-diagnostic-no-selection";

export default async function FicheDiagnosticListePage() {
  return (
    <div className="fr-container--fluid pt-8 text-black">
      <FicheDiagnosticNoSelection />
    </div>
  );
}
