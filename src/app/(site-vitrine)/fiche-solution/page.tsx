import { FichesSolutions } from "@/src/components/ficheSolution/fiches-solutions";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";

export const metadata: Metadata = computeMetadata("Explorez nos solutions");

export default async function FichesSolutionsPage(props: {
  searchParams: Promise<{
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;
  const allFichesSolutions = await getAllFichesSolutions();
  return (
    <div className="fr-container">
      <h1 className="fr-h3 mt-6">Trouvez les solutions les plus adaptées à votre espace à rafraîchir</h1>
      <FichesSolutions allFichesSolutions={allFichesSolutions} searchParams={searchParams} />
    </div>
  );
}
