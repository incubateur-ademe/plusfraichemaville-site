"use client";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_AIDE_DECISION_FIRST_STEPS_URL } from "@/src/helpers/routes";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import { AideDecisionFirstStepSkeleton } from "@/src/components/espace-projet/recherche-solutions/aide-decision-first-step-skeleton";
import AideDecisionFirstStepEtapeCard from "./aide-decision-first-step-card";

export const AideDecisionFirstStep = () => {
  const { data: aideDecisionFirstSteps, isLoading } = useImmutableSwrWithFetcher<AideDecisionEtape[]>(
    GET_AIDE_DECISION_FIRST_STEPS_URL,
  );

  return (
    <div className="">
      <h2 className={"mb-12 text-center text-xl"}>Sur quel espace voulez-vous agir ?</h2>
      <div className="m-auto max-w-2xl">
        {isLoading ? (
          <AideDecisionFirstStepSkeleton />
        ) : (
          <ul className="flex list-none flex-wrap justify-center gap-6">
            {aideDecisionFirstSteps?.map((aideDecision) => (
              <li key={aideDecision.id} className="flex justify-center p-0">
                <AideDecisionFirstStepEtapeCard etapeAttributes={aideDecision.attributes} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
