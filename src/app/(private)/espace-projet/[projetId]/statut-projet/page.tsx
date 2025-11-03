import { BREADCRUMB_STATUT_PROJET } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { StatutProjetPage } from "@/src/components/espace-projet/statut-projet/statut-projet-page";

export default function Page() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_STATUT_PROJET} />
      <div className="fr-container pt-8">
        <StatutProjetPage />
      </div>
    </>
  );
}
