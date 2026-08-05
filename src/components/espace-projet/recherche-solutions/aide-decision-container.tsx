"use client";
import { useUserStore } from "@/src/stores/user/provider";
import { AideDecisionFirstStep } from "@/src/components/espace-projet/recherche-solutions/aide-decision-first-step";


export const AideDecisionContainer = () => {
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);
  const currentStep = navigationPreferences.espaceProjet.solution.currentAideDecisionStep;

  return <div className="bg-dsfr-background-alt-blue-france pt-6 pb-16">{!currentStep ? <AideDecisionFirstStep /> : "Ecran suivant"}</div>;
};
