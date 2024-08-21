import { ProtectedEspaceProjetUrl } from "@/components/common/protected-espace-projet-url";
import { FicheDiagnostic } from "@/components/fiches-diagnostic/fiche-diagnostic";
import { getFicheDiagnosticBySlug } from "@/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";

export default async function FicheDiagnosticPage({ params }: { params: { ficheDiagnosticSlug: string } }) {
  const ficheDiagnostic = await getFicheDiagnosticBySlug(params.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }
  return (
    <ProtectedEspaceProjetUrl>
      <FicheDiagnostic ficheDiagnostic={ficheDiagnostic} />
    </ProtectedEspaceProjetUrl>
  );
}
