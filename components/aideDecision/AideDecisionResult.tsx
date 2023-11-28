import { getAideDecisionEtapeBySlug, getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import FicheTechniqueCard from "@/components/aideDecision/FicheTechniqueCard";
import FicheTechniqueCardWithUserInfo from "@/components/aideDecision/FicheTechniqueCardWithUserInfo";

type Props = {
  aideDecisionEtapeSlug: string;
};

export default async function AideDecisionResult({ aideDecisionEtapeSlug }: Props) {
  const aideDecisionEtape = await getAideDecisionEtapeBySlug(aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(aideDecisionEtapeSlug);
  if (aideDecisionEtape) {
    return (
      <>
        <h1 className={"mb-4 text-center"}>Les solutions possibles</h1>
        <ul className="flex list-none flex-wrap justify-center p-0">
          {aideDecisionEtape.fiche_technique_id.map((ficheTechnique) => (
            <li key={ficheTechnique.fiche_technique_id.id} className="m-2 w-72 flex">
              <FicheTechniqueCardWithUserInfo
                ficheTechnique={ficheTechnique.fiche_technique_id}
                aideDecisionFirstStepName={(historique && historique[1].label) || ""}
              >
                <FicheTechniqueCard ficheTechnique={ficheTechnique.fiche_technique_id} />
              </FicheTechniqueCardWithUserInfo>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <h1>Aucune fiche technique ne correspond à vos critères...</h1>
      </>
    );
  }
}
