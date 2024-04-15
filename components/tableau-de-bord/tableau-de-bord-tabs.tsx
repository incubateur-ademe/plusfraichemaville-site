"use client";

import { TableauDeBordSuivi, TableauDeBordTab } from ".";
import clsx from "clsx";
import { TableauDeBordRecommandation } from "./tableau-de-bord-recommandations";

import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useParams, useSearchParams } from "next/navigation";
import { updateRecommandationsViewedByUser } from "@/actions/projets/update-recommandations-viewed-by-user-action";
import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";

const getButtonTabClassName = (active: boolean) =>
  clsx(
    "px-6 py-4 text-sm hover:!bg-dsfr-border-action-low-blue-france hover:!text-dsfr-background-flat-blue-france",
    active && "bg-dsfr-border-action-low-blue-france text-dsfr-background-flat-blue-france",
  );

export const TableauDeBordTabs = () => {
  const { projetId } = useParams();
  const params = useSearchParams();
  const currentTab = params.get("tab");

  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUser = useUserStore((state) => state.userInfos?.id);
  const recommandationViewed = currentProjet?.recommandations_viewed_by;
  const recommandationsAlreadyViewed = currentUser && recommandationViewed?.includes(currentUser);

  const tabs = [
    {
      label: "Tableau de suivi",
      filter: "tableau-de-suivi",
      component: <TableauDeBordSuivi />,
    },
    {
      label: "Recommandations",
      filter: "recommandation",
      component: <TableauDeBordRecommandation />,
      update: async () => {
        if (currentUser && !recommandationsAlreadyViewed) {
          const updatedProjet = await updateRecommandationsViewedByUser(projetId as string, currentUser, "add");
          if (updatedProjet.projet) {
            addOrUpdateProjet(updatedProjet.projet);
          }
        }
      },
    },
  ];

  return (
    <>
      <div className="bg-dsfr-background-alt-blue-france">
        <div className="flex fr-container">
          {tabs.map((tab, index) => (
            <Link
              href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(+projetId, tab.filter)}
              data-tab={tab.filter}
              data-index=""
              className={clsx(
                getButtonTabClassName(currentTab === tab.filter),
                "!bg-none relative",
                !recommandationsAlreadyViewed &&
                  tab.filter === "recommandation" &&
                  currentProjet?.fiches_solutions_id &&
                  currentProjet.fiches_solutions_id.length > 0 &&
                  `after:right-4 after:rounded-full after:w-[7.5px] after:h-[7.5px]`,
                tab.filter === "recommandation" &&
                  "after:absolute after:top-2 after:bg-dsfr-background-flat-blue-france",
              )}
              onClick={async () => tab.update && tab.update()}
              key={`button-tab-${index}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="tabs bg-dsfr-border-action-low-blue-france min-h-[40rem] py-10">
        <div className="fr-container">
          {tabs.map((tab, index) => (
            <TableauDeBordTab active={currentTab === tab.filter} key={index}>
              {tab.component}
            </TableauDeBordTab>
          ))}
        </div>
      </div>
    </>
  );
};
