import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { FichesSolutions } from "@/src/components/ficheSolution/fiches-solutions";

export default async function FichesSolutionsListePage({
  searchParams,
}: {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
}) {
  return (
    <ProtectedEspaceProjetUrl>
      <FichesSolutions searchParams={searchParams} />
    </ProtectedEspaceProjetUrl>
  );
}
