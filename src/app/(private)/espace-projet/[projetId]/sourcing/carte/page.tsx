import { SourcingSearch } from "@/src/components/sourcing/sourcing-search";

const SourcingMapPage = ({ params }: { params: { projetId: string } }) => {
  return <SourcingSearch projetId={params.projetId} />;
};
export default SourcingMapPage;
