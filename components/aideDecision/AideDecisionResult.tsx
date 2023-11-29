import { getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import FicheTechniqueCard from "@/components/aideDecision/FicheTechniqueCard";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import FicheSolutionCardWithUserInfo from "@/components/aideDecision/FicheSolutionCardWithUserInfo";

type Props = {
  aideDecisionEtape: AideDecisionEtape;
};

export default async function AideDecisionResult({ aideDecisionEtape }: Props) {
  const historique = await getAideDecisionHistoryBySlug(aideDecisionEtape.slug);
  if (aideDecisionEtape.fiches_solutions.length > 0) {
    return (
      <>
        <h1 className={"mb-4 text-center"}>Les solutions possibles</h1>
        <ul className="flex list-none flex-wrap justify-center p-0">
          {aideDecisionEtape.fiches_solutions.map((ficheSolution) => (
            <li key={ficheSolution.fiche_solution_id.id} className="m-2 w-72 flex">
              <FicheSolutionCardWithUserInfo
                ficheSolution={ficheSolution.fiche_solution_id}
                aideDecisionFirstStepName={(historique && historique[1].label) || ""}
              >
                <FicheTechniqueCard ficheTechnique={ficheSolution.fiche_solution_id} />
              </FicheSolutionCardWithUserInfo>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <h1 className={"mb-4 pt-10 text-center"}>Aucune Fiche Solution ne correspond à vos critères...</h1>
      </>
    );
  }
}
