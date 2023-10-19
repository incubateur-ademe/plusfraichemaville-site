import { getAideDecisionEtapeBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import FicheTechniqueCard from "@/components/aideDecision/ficheTechniqueCard";

type Props = {
  aideDecisionEtapeSlug: string;
};

export default async function AideDecisionResult({ aideDecisionEtapeSlug }: Props) {
  const aideDecisionEtape = await getAideDecisionEtapeBySlug(aideDecisionEtapeSlug);
  if (aideDecisionEtape) {
    return (
      <>
        <h1 className={"mb-4 text-center"}>Les solutions possibles</h1>
        <ul className="flex list-none flex-wrap justify-center p-0">
          {aideDecisionEtape.fiche_technique_id.map((ficheTechnique) => (
            <li key={ficheTechnique.fiche_technique_id.id} className="m-2 w-72 flex">
              <FicheTechniqueCard ficheTechnique={ficheTechnique.fiche_technique_id} />
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
