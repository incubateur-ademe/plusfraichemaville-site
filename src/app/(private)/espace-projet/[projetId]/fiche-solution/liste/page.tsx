import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { FichesSolutions } from "@/src/components/ficheSolution/fiches-solutions";

export default async function FichesSolutionsListePage(props: {
  searchParams: Promise<{
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <ProtectedEspaceProjetUrl>
      <FichesSolutions searchParams={searchParams} />
    </ProtectedEspaceProjetUrl>
  );
}
