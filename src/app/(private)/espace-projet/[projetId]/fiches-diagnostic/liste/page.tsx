import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { FichesDiagnostic } from "@/src/components/fiches-diagnostic/fiches-diagnostic";
import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";

export default async function FichesDiagnosticPage() {
  const fichesDiagnosticResponse = await getAllFichesDiagnostic();

  return (
    <ProtectedEspaceProjetUrl>
      <FichesDiagnostic fichesDiagnostic={fichesDiagnosticResponse} />
    </ProtectedEspaceProjetUrl>
  );
}
