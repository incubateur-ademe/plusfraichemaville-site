"use client";
import { useUserStore } from "@/src/stores/user/provider";
import { AideDecisionFirstStep } from "@/src/components/espace-projet/recherche-solutions/aide-decision-first-step";
import { AideDecisionStep } from "@/src/components/espace-projet/recherche-solutions/aide-decision-step";

export const AideDecisionContainer = () => {
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);
  const currentStep = navigationPreferences.choixSolutionAideDecisionCurrentStep;

  return (
    <div className="bg-dsfr-background-alt-blue-france pb-16 pt-6">
      {!currentStep ? <AideDecisionFirstStep /> : <AideDecisionStep currentStep={currentStep} />}
    </div>
  );
};
