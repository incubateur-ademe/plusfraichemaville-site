import { ProtectedEspaceProjetUrl } from "@/components/common/protected-espace-projet-url";
import { FicheSolution } from "@/components/ficheSolution/fiche-solution";

export default async function FicheSolutionPage({
  params,
  searchParams,
}: {
  params: { ficheSolutionSlug: string; projetId: string };
  searchParams: { etapeAideDecision: string | undefined };
}) {
  return (
    <ProtectedEspaceProjetUrl>
      <FicheSolution params={params} searchParams={searchParams} />
    </ProtectedEspaceProjetUrl>
  );
}
