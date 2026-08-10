import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { BREADCRUMB_SOLUTION_TOUTES_SOLUTIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { RechercheSolutions } from "@/src/components/espace-projet/recherche-solutions/recherche-solutions";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";

export type FichesSolutionsListeSearchParams = {
  espaceFilter: string | undefined;
  typeSolutionFilter: string | undefined;
  baisseTemperatureFilter: string | undefined;
};

/**
 * Contenu partagé entre les routes /fiche-solution/liste et /fiche-solution/liste/arbre :
 * cette dernière ne sert qu'à donner une URL dédiée à l'étape en cours de l'aide à la décision
 * (voir AideDecisionContainer), le contenu affiché est identique.
 */
export const FichesSolutionsListePageContent = async ({
  searchParams,
}: {
  searchParams: FichesSolutionsListeSearchParams;
}) => {
  const allFichesSolutions = await getAllFichesSolutions();
  return (
    <ProtectedEspaceProjetUrl>
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_TOUTES_SOLUTIONS} />
      <RechercheSolutions searchParams={searchParams} allFichesSolutions={allFichesSolutions} />
    </ProtectedEspaceProjetUrl>
  );
};
