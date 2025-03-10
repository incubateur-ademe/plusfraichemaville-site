import { FicheDiagnosticGuide } from "@/src/components/fiches-diagnostic/fiche-diagnostic-guide";
import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";

export default async function FicheDiagnosticListePage(props: { params: Promise<{ projetId: number }> }) {
  const params = await props.params;
  return (
    <ProtectedEspaceProjetUrl>
      <div className="fr-container--fluid pt-8 text-black">
        <FicheDiagnosticGuide projetId={+params.projetId} />
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
