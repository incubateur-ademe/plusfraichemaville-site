"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/src/stores/user/provider";
import Tabs from "@codegouvfr/react-dsfr/Tabs";
import { FichesSolutions } from "../../ficheSolution/fiches-solutions";
import { SolutionTabIds, SolutionTabIdType } from "@/src/stores/user/helper";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { AideDecisionContainer } from "@/src/components/espace-projet/recherche-solutions/aide-decision-container";
import { PFMV_ROUTES } from "@/src/helpers/routes";

type RechercheSolutionsProps = {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
  allFichesSolutions: FicheSolution[];
};

export const RechercheSolutions = ({ allFichesSolutions, searchParams }: RechercheSolutionsProps) => {
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);
  const setSolutionTab = useUserStore((state) => state.setChoixSolutionSelectedTabId);
  const currentTab = navigationPreferences?.choixSolutionSelectedTabId || SolutionTabIds.ARBRE;
  const currentStep = navigationPreferences.choixSolutionAideDecisionCurrentStep;

  const router = useRouter();
  const pathname = usePathname();
  const { projetId } = useParams<{ projetId: string }>();

  // Change d'onglet et donne à chaque onglet sa propre URL (pour le tracking analytics, et pour
  // retrouver le bon onglet si on revient dessus). On ne fait ce calcul qu'au moment du clic
  // (pas en réaction au store) pour ne pas se battre avec la synchronisation de AideDecisionContainer.
  const handleTabChange = (tabId: string) => {
    setSolutionTab(tabId as SolutionTabIdType);
    if (!projetId) {
      return;
    }
    const targetUrl =
      tabId === SolutionTabIds.TOUTES_SOLUTIONS
        ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_TOUTES_SOLUTIONS(+projetId)
        : currentStep
          ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_ARBRE(+projetId)
          : PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(+projetId);
    if (pathname !== targetUrl) {
      router.replace(targetUrl);
    }
  };

  return (
    <div className="fr-container mt-6">
      <Tabs
        selectedTabId={currentTab}
        onTabChange={handleTabChange}
        tabs={[
          {
            label: "Recherche guidée",
            tabId: SolutionTabIds.ARBRE,
          },
          {
            label: "Liste complète des solutions",
            tabId: SolutionTabIds.TOUTES_SOLUTIONS,
          },
        ]}
      >
        <>
          {currentTab === SolutionTabIds.ARBRE ? (
            <AideDecisionContainer />
          ) : (
            <FichesSolutions allFichesSolutions={allFichesSolutions} searchParams={searchParams} />
          )}
        </>
      </Tabs>
    </div>
  );
};
