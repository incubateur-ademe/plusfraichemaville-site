import { FicheDiagnosticChoix } from "@/src/components/fiches-diagnostic/fiche-diagnostic-choix";
import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";

export default async function FicheDiagnosticListePage({ params }: { params: { projetId: number } }) {
  return (
    <ProtectedEspaceProjetUrl>
      <div className="fr-container--fluid pt-8 text-black">
        <FicheDiagnosticChoix projetId={+params.projetId} />
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
