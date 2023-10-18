import Link from "next/link";
import { getAideDecisionEtapeBySlug } from "@/lib/directus/queries/aideDecisionQueries";

type Props = {
  aideDecisionEtapeSlug: string;
};

export default async function AideDecisionResult({ aideDecisionEtapeSlug }: Props) {
  const aideDecisionEtape = await getAideDecisionEtapeBySlug(aideDecisionEtapeSlug);
  if (aideDecisionEtape) {
    return (
      <>
        <h1>{aideDecisionEtape.question_suivante}</h1>
        {aideDecisionEtape.fiche_technique_id.map((ficheTechnique) => (
          <div key={ficheTechnique.fiche_technique_id.id}>
            <Link href={`/fiche-technique/${ficheTechnique.fiche_technique_id.slug}`}>
              {ficheTechnique.fiche_technique_id.titre}
            </Link>
          </div>
        ))}
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
