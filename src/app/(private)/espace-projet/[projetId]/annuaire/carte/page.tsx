import { AnnuaireSearch } from "@/src/components/annuaire/annuaire-search";
import { BREADCRUMB_ANNUAIRE_CARTE } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-annuaire";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

const AnnuaireMapPage = async (props: { params: Promise<{ projetId: string }> }) => {
  const params = await props.params;
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_ANNUAIRE_CARTE} />
      <AnnuaireSearch projetId={params.projetId} />
    </>
  );
};
export default AnnuaireMapPage;
