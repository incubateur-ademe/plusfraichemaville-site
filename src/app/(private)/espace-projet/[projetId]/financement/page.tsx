import { Financement } from "@/src/components/financement";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_MES_FINANCEMENTS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-financement";

export default function FinancementPage() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_MES_FINANCEMENTS} />
      <Financement />
    </>
  );
}
