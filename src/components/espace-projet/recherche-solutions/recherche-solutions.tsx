"use client";
import { useUserStore } from "@/src/stores/user/provider";
import Tabs from "@codegouvfr/react-dsfr/Tabs";
import { FichesSolutions } from "../../ficheSolution/fiches-solutions";
import { SolutionTabIds, SolutionTabIdType } from "@/src/stores/user/helper";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { AideDecisionContainer } from "@/src/components/espace-projet/recherche-solutions/aide-decision-container";

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

  return (
    <div className="fr-container mt-6">
      <Tabs
        selectedTabId={currentTab}
        onTabChange={(tabId: string) => setSolutionTab(tabId as SolutionTabIdType)}
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
