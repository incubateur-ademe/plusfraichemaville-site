import {
  getAideDecisionEtapeByEtapeParentSlug,
  getAideDecisionEtapeBySlug,
  getAideDecisionHistoryBySlug,
} from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import AideDecisionResult from "@/app/aide-decision/[aideDecisionEtapeSlug]/aideDecisionResult";
import AideDecisionEtapeCard from "@/components/aideDecision/aideDecisionEtapeCard";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Image from "next/image";

export default async function Page({ params }: { params: { aideDecisionEtapeSlug: string } }) {
  const aideDecisionEtapes = await getAideDecisionEtapeByEtapeParentSlug(params.aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(params.aideDecisionEtapeSlug);
  if (aideDecisionEtapes.length > 0) {
    const currentStep = aideDecisionEtapes[0].etape_parente_id as AideDecisionEtape;
    const firstStep = historique && historique[1] ? historique[1] : currentStep;
    return (
      <div className={"fr-container"}>
        <Image
          width={46}
          height={46}
          src={getDirectusImageUrl(firstStep.image, DIRECTUS_IMAGE_KEY_SIZE.aideDecisionCard)}
          alt={currentStep.question_suivante || ""}
          className="pt-7 m-auto"
        />
        <h1 className={"mb-10 text-center text-xl"}>{currentStep.question_suivante}</h1>
        <ul className="flex list-none flex-wrap justify-center p-0">
          {aideDecisionEtapes.map((aideDecision) => (
            <li key={aideDecision.id} className="m-3 w-56 flex">
              <AideDecisionEtapeCard aideDecisionEtape={aideDecision} />
            </li>
          ))}
        </ul>
      </div>
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
