import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getNbAidesFromAidesTerritoires } from "@/src/lib/aidesTerritoires/fetch";
import FicheSolutionFinancementsIncentive from "@/src/components/ficheSolution/fiche-solution-financements-incentive";

export default async function FicheSolutionTabFinancements({
  ficheId,
  ficheAttributes,
}: {
  ficheId: number;
  ficheAttributes: FicheSolution["attributes"];
}) {
  const nbAides = await getNbAidesFromAidesTerritoires([ficheAttributes]);

  return (
    <div className="text-dsfr-text-title-grey">
      <h2 className="mb-8 text-[1.75rem] font-bold">Financements</h2>

      <div className="mb-10">
        <FicheSolutionFinancementsIncentive ficheId={ficheId} nbAides={nbAides} />
      </div>
    </div>
  );
}
