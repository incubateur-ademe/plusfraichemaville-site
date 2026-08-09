import { FichesSolutions } from "@/src/components/ficheSolution/fiches-solutions";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import AideDecisionIncentiveBanner from "@/src/components/common/espace-projet-incentive/aide-decision-incentive-banner";

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
      <h1 className="fr-h3 !mb-2 mt-8">Trouvez les solutions les plus adaptées à votre espace à rafraîchir</h1>
      <AideDecisionIncentiveBanner className="mt-8 md:ml-12" />
      <FichesSolutions allFichesSolutions={allFichesSolutions} searchParams={searchParams} />
    </div>
  );
}
