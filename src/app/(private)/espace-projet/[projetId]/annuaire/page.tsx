import { Annuaire } from "@/src/components/annuaire/annuaire";
import { BREADCRUMB_ANNUAIRE_CARTE } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-annuaire";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

const AnnuairePage = async (props: { params: Promise<{ projetId: string }> }) => {
  const params = await props.params;
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_ANNUAIRE_CARTE} />
      <Annuaire projetId={params.projetId} />
    </>
  );
};
export default AnnuairePage;
