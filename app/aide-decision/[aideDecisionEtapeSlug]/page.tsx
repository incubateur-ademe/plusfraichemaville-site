import {
  getAideDecisionEtapeByEtapeParentSlug,
  getAideDecisionHistoryBySlug,
} from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import AideDecisionEtapeCard from "@/components/aideDecision/aideDecisionEtapeCard";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { aideDecisionEtapeSlug: string } }) {
  const aideDecisionEtapes = await getAideDecisionEtapeByEtapeParentSlug(params.aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(params.aideDecisionEtapeSlug);
  if (aideDecisionEtapes.length > 0) {
    const currentStep = aideDecisionEtapes[0].etape_parente_id as AideDecisionEtape;
    const firstStep = historique && historique[1] ? historique[1] : currentStep;
    const previousStep = historique && historique[historique.length - 1] ? historique[historique.length - 1] : null;
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
        {previousStep && (
          <Link
            className="fr-link fr-icon-arrow-left-line fr-link--icon-left"
            href={`/aide-decision/${previousStep.slug}`}
          >
            Retour
          </Link>
        )}
      </div>
    );
  } else {
    notFound();
  }
}
