import Link from "next/link";
import {
  getAideDecisionEtapeByEtapeParentSlug,
  getAideDecisionEtapeBySlug,
} from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import AideDecisionResult from "@/app/aide-decision/[aideDecisionEtapeSlug]/aideDecisionResult";

export default async function Page({ params }: { params: { aideDecisionEtapeSlug: string } }) {
  const aideDecisionEtapes = await getAideDecisionEtapeByEtapeParentSlug(params.aideDecisionEtapeSlug);
  if (aideDecisionEtapes.length > 0) {
    const etapeParente = aideDecisionEtapes[0].etape_parente_id as AideDecisionEtape;

    return (
      <>
        <h3>{etapeParente.question_suivante}</h3>
        {aideDecisionEtapes.map((aideDecision) => (
          <div key={aideDecision.id}>
            <Link href={`/aide-decision/${aideDecision.slug}`}>{aideDecision.nom}</Link>
          </div>
        ))}
      </>
    );
  } else {
    const aideDecisionEtape = await getAideDecisionEtapeBySlug(params.aideDecisionEtapeSlug);
    if (aideDecisionEtape) {
      return <AideDecisionResult aideDecisionEtapeSlug={params.aideDecisionEtapeSlug} />;
    } else {
      return (
        <>
          <h1>Page non trouvée...</h1>
        </>
      );
    }
  }
}
