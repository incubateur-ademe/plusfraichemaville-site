import { FichesSolutions } from "@/components/ficheSolution/fiches-solutions";

export default async function FichesSolutionsPage({
  searchParams,
}: {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
}) {
  return <FichesSolutions searchParams={searchParams} />;
}
