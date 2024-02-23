import AideDecisionEtapeCard from "@/components/aideDecision/AideDecisionEtapeCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AideDecisionResult from "@/components/aideDecision/AideDecisionResult";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";
import { getAideDecisionBySlug, getAideDecisionHistoryBySlug } from "@/lib/strapi/queries/aideDecisionQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/helpers/routes";

export default async function Page({
  params,
  searchParams,
}: {
  params: { aideDecisionEtapeSlug: string };
  searchParams: { tri: string | undefined };
}) {
  const currentStep = await getAideDecisionBySlug(params.aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(params.aideDecisionEtapeSlug);
  if (!!currentStep?.attributes.etapes_suivantes?.data && currentStep?.attributes.etapes_suivantes?.data?.length > 0) {
    const firstStep = historique && historique[1] ? historique[1] : currentStep.attributes;
    const previousStep = currentStep.attributes.etape_precedente;
    const previsousStepSlug = previousStep?.data?.attributes?.slug
      ? `${PFMV_ROUTES.AIDE_DECISION}/${previousStep.data.attributes.slug}`
      : PFMV_ROUTES.AIDE_DECISION;
    return (
      <div className={"fr-container"}>
        <div className="block md:flex flex-row justify-items-center">
          {historique && (
            <AideDecisionBreadcrumbs
              currentPageLabel={currentStep.attributes.nom}
              historique={historique}
              className="hidden md:block md:mt-60"
            />
          )}
          <div className="grow">
            <Image
              width={46}
              height={46}
              src={getStrapiImageUrl(firstStep.image, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={currentStep.attributes.question_suivante || "Etape suivante"}
              className="pt-7 m-auto"
            />
            <h1 className={"mb-10 text-center text-xl"}>{currentStep.attributes.question_suivante}</h1>
            <ul className="flex list-none flex-wrap justify-center p-0">
              {currentStep.attributes.etapes_suivantes.data.map((aideDecision) => (
                <li key={aideDecision.id} className="m-3 w-96 md:w-56 flex">
                  <AideDecisionEtapeCard aideDecisionEtape={aideDecision.attributes} />
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center md:text-left">
              <Link className="fr-link fr-icon-arrow-left-line fr-link--icon-left" href={previsousStepSlug}>
                Retour
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const aideDecisionEtape = await getAideDecisionBySlug(params.aideDecisionEtapeSlug);
    if (aideDecisionEtape) {
      return <AideDecisionResult searchParams={searchParams} aideDecisionEtape={aideDecisionEtape.attributes} />;
    } else {
      notFound();
    }
  }
}
