"use client";
import { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/src/stores/user/provider";
import { AideDecisionFirstStep } from "@/src/components/espace-projet/recherche-solutions/aide-decision-first-step";
import { AideDecisionStep } from "@/src/components/espace-projet/recherche-solutions/aide-decision-step";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const AideDecisionContainer = () => {
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);
  const currentStep = navigationPreferences.choixSolutionAideDecisionCurrentStep;

  const router = useRouter();
  const pathname = usePathname();
  const { projetId } = useParams<{ projetId: string }>();

  // Une étape est en cours : on donne à l'arbre de décision sa propre URL (sans ajouter d'entrée
  // dans l'historique du navigateur), tout en laissant le store gérer la navigation entre étapes.
  // Ainsi, si on revient sur cette URL plus tard, le store permet de reprendre là où on s'était arrêté.
  useEffect(() => {
    if (!projetId || !currentStep) {
      return;
    }
    const arbreUrl = PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_ARBRE(+projetId);
    if (pathname !== arbreUrl) {
      router.replace(arbreUrl);
    }
  }, [currentStep, pathname, projetId, router]);

  return (
    <div className="bg-dsfr-background-alt-blue-france px-4 pb-16 pt-2">
      {!currentStep ? <AideDecisionFirstStep /> : <AideDecisionStep currentStep={currentStep} />}
    </div>
  );
};
