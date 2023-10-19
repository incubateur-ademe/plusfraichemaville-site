import {
  getAideDecisionEtapeByEtapeParentSlug,
  getAideDecisionEtapeBySlug,
} from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import AideDecisionResult from "@/app/aide-decision/[aideDecisionEtapeSlug]/aideDecisionResult";
import AideDecisionEtapeCard from "@/components/aideDecision/aideDecisionEtapeCard";

export default async function Page({ params }: { params: { aideDecisionEtapeSlug: string } }) {
  const aideDecisionEtapes = await getAideDecisionEtapeByEtapeParentSlug(params.aideDecisionEtapeSlug);
  if (aideDecisionEtapes.length > 0) {
    const etapeParente = aideDecisionEtapes[0].etape_parente_id as AideDecisionEtape;

    return (
      <>
        <h1 className={"mb-4 text-center"}>{etapeParente.question_suivante}</h1>
        <ul className="flex list-none flex-wrap justify-center p-0">
          {aideDecisionEtapes.map((aideDecision) => (
            <li key={aideDecision.id} className="m-2 w-80 flex">
              <AideDecisionEtapeCard aideDecisionEtape={aideDecision} />
            </li>
          ))}
        </ul>
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
