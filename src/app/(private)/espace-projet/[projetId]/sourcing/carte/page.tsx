import { SourcingSearch } from "@/src/components/sourcing/sourcing-search";

const SourcingMapPage = async (props: { params: Promise<{ projetId: string }> }) => {
  const params = await props.params;
  return <SourcingSearch projetId={params.projetId} />;
};
export default SourcingMapPage;
