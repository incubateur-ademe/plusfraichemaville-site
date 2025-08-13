import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { FichesSolutions } from "@/src/components/ficheSolution/fiches-solutions";
import { BREADCRUMB_SOLUTION_TOUTES_SOLUTIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

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
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_TOUTES_SOLUTIONS} />
      <FichesSolutions searchParams={searchParams} />
    </ProtectedEspaceProjetUrl>
  );
}
