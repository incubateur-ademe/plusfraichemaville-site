import { FicheDiagnosticNoSelection } from "@/src/components/fiches-diagnostic/fiche-diagnostic-no-selection";
import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";

export default async function FicheDiagnosticListePage() {
  return (
    <ProtectedEspaceProjetUrl>
      <div className="fr-container--fluid pt-8 text-black">
        <FicheDiagnosticNoSelection />
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
