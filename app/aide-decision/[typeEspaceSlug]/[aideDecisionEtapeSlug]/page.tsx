import Link from "next/link";
import {
  getAideDecisionEtapeByEtapeParentSlug,
  getAideDecisionEtapeBySlug,
} from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape } from "@/lib/directus/directusModels";

export default async function Page({ params }: { params: { typeEspaceSlug: string; aideDecisionEtapeSlug: string } }) {
  const aideDecisionEtapes = await getAideDecisionEtapeByEtapeParentSlug(params.aideDecisionEtapeSlug);
  if (aideDecisionEtapes.length > 0) {
    const etapeParente = aideDecisionEtapes[0].etape_parente_id as AideDecisionEtape;

    return (
      <>
        <h1>{etapeParente.question_suivante}</h1>
        {aideDecisionEtapes.map((aideDecision) => (
          <div key={aideDecision.id}>
            <Link href={`/aide-decision/${params.typeEspaceSlug}/${aideDecision.slug}`}>{aideDecision.nom}</Link>
          </div>
        ))}
      </>
    );
  } else {
    const aideDecisionEtape = await getAideDecisionEtapeBySlug(params.aideDecisionEtapeSlug);
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
          <h1>Page non trouvée...</h1>
        </>
      );
    }
  }
}
