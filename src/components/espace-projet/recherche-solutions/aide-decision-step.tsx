"use client";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_AIDE_DECISION_STEP_URL } from "@/src/helpers/routes";
import { AideDecisionStepData } from "@/src/lib/strapi/queries/commonStrapiFilters";
import AideDecisionResultContainer from "@/src/components/espace-projet/recherche-solutions/aide-decision-result-container";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { FilDArianeAvecBouton } from "@/src/components/common/fil-d-arianne-avec-bouton";
import { useUserStore } from "@/src/stores/user/provider";
import AideDecisionEtapeCard from "./aide-decision-etape-card";
import { AideDecisionStepSkeleton } from "@/src/components/espace-projet/recherche-solutions/aide-decision-step-skeleton";

export const AideDecisionStep = ({ currentStep }: { currentStep: string }) => {
  const { data, error, isLoading } = useImmutableSwrWithFetcher<AideDecisionStepData>(
    GET_AIDE_DECISION_STEP_URL(currentStep),
  );
  const setAideDecisionStep = useUserStore((state) => state.setChoixSolutionAideDecisionCurrentStep);

  const etape = data?.etape;
  const historique = data?.historique;

  // Tant que la requête n'est pas terminée (ni données, ni erreur), on affiche le skeleton.
  // Cela évite de lever une exception "étape non trouvée" à tort le temps que le fetch se lance.
  if (isLoading || (!data && !error)) {
    return <AideDecisionStepSkeleton />;
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
        <AideDecisionResultContainer
          aideDecisionEtapeHistory={historique}
          aideDecisionEtapeAttributes={etape.attributes}
        />
      );
    } else if (error) {
      customCaptureException(`Erreur lors de la récupération de l'étape d'aide à la décision ${currentStep}`, error);
      return <p>Une erreur est survenue lors du chargement de cette étape.</p>;
    } else {
      customCaptureException(
        `Aide décision étape non trouvée ${currentStep}`,
        new Error("Aide décision étape non trouvée"),
      );
      return <p>Cette étape n'est pas encore définie...</p>;
    }
  }
};
