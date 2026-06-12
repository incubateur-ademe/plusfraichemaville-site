import { Suspense } from "react";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import FicheSolutionFinancementsIncentive from "@/src/components/ficheSolution/fiche-solution-financements-incentive";
import FicheSolutionNbAidesLoader from "@/src/components/ficheSolution/fiche-solution-nb-aides-loader";

export default function FicheSolutionTabFinancements({
  ficheId,
  ficheAttributes,
}: {
  ficheId: number;
  ficheAttributes: FicheSolution["attributes"];
}) {
  return (
    <div className="text-dsfr-text-title-grey">
      <h2 className="mb-8 text-[1.75rem] font-bold">Financements</h2>

      <div className="mb-10">
        <Suspense fallback={<FicheSolutionFinancementsIncentive ficheId={ficheId} nbAides={0} />}>
          <FicheSolutionNbAidesLoader ficheId={ficheId} ficheAttributes={ficheAttributes} />
        </Suspense>
      </div>
    </div>
  );
}
