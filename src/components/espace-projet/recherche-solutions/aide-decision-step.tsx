"use client";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_AIDE_DECISION_STEP_URL } from "@/src/helpers/routes";
import { AideDecisionStepData } from "@/src/lib/strapi/queries/commonStrapiFilters";
import AideDecisionBreadcrumbs from "@/src/components/aideDecision/AideDecisionBreadcrumbs";
import AideDecisionEtapeCard from "@/src/components/aideDecision/AideDecisionEtapeCard";
import AideDecisionResult from "@/src/components/aideDecision/AideDecisionResult";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

export const AideDecisionStep = ({ currentStep }: { currentStep: string }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AideDecisionStepData>(GET_AIDE_DECISION_STEP_URL(currentStep));

  const etape = data?.etape;
  const historique = data?.historique;
  if (isLoading) {
    return (
      <div className={"fr-container"}>
        <div className="rounded-lg h-6 mx-auto w-80 animate-pulse bg-dsfr-background-default-grey-active" />

        <div className="mt-12 rounded-2xl mx-auto w-2/3 h-40 animate-pulse bg-dsfr-background-default-grey-active" />

      </div>
    )
  }

  if (!!etape?.attributes.etapes_suivantes?.data && etape?.attributes.etapes_suivantes?.data?.length > 0) {
    return (
      <div className={"fr-container"}>
        <div className="block flex-row justify-items-center md:flex">
          {historique && (
            <AideDecisionBreadcrumbs
              currentPageLabel={etape.attributes.nom}
              historique={historique}
              className="hidden md:mt-60 md:block"
            />
          )}
          <div className="grow">
            <h2 className={"mb-10 text-center text-xl"}>{etape.attributes.question_suivante}</h2>
            <ul className="flex list-none flex-wrap justify-center p-0">
              {etape.attributes.etapes_suivantes.data.map((aideDecision) => (
                <li key={aideDecision.id} className="m-3 flex w-96 md:w-[220px]">
                  <AideDecisionEtapeCard etapeAttributes={aideDecision.attributes} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    if (etape) {
      return (
        <AideDecisionResult aideDecisionEtapeHistory={historique} aideDecisionEtapeAttributes={etape.attributes} />
      );
    } else {
      customCaptureException(
        `Aide décision étape non trouvée ${currentStep}`,
        new Error("Aide décision étape non trouvée"),
      );
      return <p>Cette étape n'est pas encore définie...</p>;
    }
  }
};
