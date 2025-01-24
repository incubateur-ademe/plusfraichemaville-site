import { AnnuaireSearch } from "@/src/components/annuaire/annuaire-search";

const SourcingMapPage = async (props: { params: Promise<{ projetId: string }> }) => {
  const params = await props.params;
  return <AnnuaireSearch projetId={params.projetId} />;
};
export default SourcingMapPage;
