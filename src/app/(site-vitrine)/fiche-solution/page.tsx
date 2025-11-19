import { FichesSolutions } from "@/src/components/ficheSolution/fiches-solutions";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Explorez nos solutions");

export default async function FichesSolutionsPage(props: {
  searchParams: Promise<{
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="fr-container">
      <h1 className="fr-h3 mt-6">Explorez toutes les solutions de rafraîchissement urbain</h1>
      <FichesSolutions searchParams={searchParams} />
    </div>
  );
}
