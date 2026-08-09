"use client";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_AIDE_DECISION_STEP_URL } from "@/src/helpers/routes";
import { AideDecisionStepData } from "@/src/lib/strapi/queries/commonStrapiFilters";
import AideDecisionEtapeCard from "@/src/components/aideDecision/AideDecisionEtapeCard";
import AideDecisionResult from "@/src/components/aideDecision/AideDecisionResult";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { FilDArianeAvecBouton } from "@/src/components/common/fil-d-arianne-avec-bouton";
import { useUserStore } from "@/src/stores/user/provider";

export const AideDecisionStep = ({ currentStep }: { currentStep: string }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<AideDecisionStepData>(GET_AIDE_DECISION_STEP_URL(currentStep));
  const setAideDecisionStep = useUserStore((state) => state.setChoixSolutionAideDecisionCurrentStep);

  const etape = data?.etape;
  const historique = data?.historique;
  if (isLoading) {
    return (
      <div>
        <div className="mb-12 mt-6 h-4 w-64 animate-pulse rounded-lg bg-dsfr-background-default-grey-active" />
        <div className="mx-auto h-6 w-96 animate-pulse rounded-lg bg-dsfr-background-default-grey-active" />
        <div className="mx-auto mt-12 h-72 w-4/5 animate-pulse rounded-2xl bg-dsfr-background-default-grey-active" />
      </div>
    );
  }

  if (!!etape?.attributes.etapes_suivantes?.data && etape?.attributes.etapes_suivantes?.data?.length > 0) {
    return (
      <div>
        {historique && (
          <FilDArianeAvecBouton
            currentPageLabel={etape.attributes.nom}
            segments={historique.map((step) => ({
              label: step.label,
              onClick: () => setAideDecisionStep(step.slug),
            }))}
          />
        )}
        <div className="block flex-row justify-items-center md:flex">
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
