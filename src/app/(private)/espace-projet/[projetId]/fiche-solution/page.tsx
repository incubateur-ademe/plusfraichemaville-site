import { FichesSolutionsProjet } from "@/src/components/fiches-solutions-projet";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_SOLUTION_MES_SOLUTIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";

export default function FichesSolutionsProjetPage() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_MES_SOLUTIONS} />
      <FichesSolutionsProjet />
    </>
  );
}
