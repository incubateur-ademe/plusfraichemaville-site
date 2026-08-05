import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { BREADCRUMB_SOLUTION_TOUTES_SOLUTIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { RechercheSolutions } from "@/src/components/espace-projet/recherche-solutions/recherche-solutions";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";

export const metadata: Metadata = computeMetadata("Explorez nos solutions");

export default async function FichesSolutionsListePage(props: {
  searchParams: Promise<{
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;
  const allFichesSolutions = await getAllFichesSolutions();
  return (
    <ProtectedEspaceProjetUrl>
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_TOUTES_SOLUTIONS} />
      <RechercheSolutions searchParams={searchParams} allFichesSolutions={allFichesSolutions} />
    </ProtectedEspaceProjetUrl>
  );
}
