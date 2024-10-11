"use client";

import { TableauDeBordSuivi, TableauDeBordTab } from ".";

import { TableauDeBordPartage } from "./tableau-de-bord-partage";
import { TableauDeBordRecommandation } from "./tableau-de-bord-recommandations";
import { useSearchParams } from "next/navigation";

export const TableauDeBordTabs = () => {
  const params = useSearchParams();
  const currentTab = params.get("tab");

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
    },
    {
      label: "Partage",
      filter: "partage",
      component: <TableauDeBordPartage />,
    },
  ];

  return (
    <>
      <div className="tabs min-h-[40rem] bg-dsfr-border-action-low-blue-france py-10">
        <div className="fr-container">
          {tabs.map(
            (tab, index) =>
              currentTab === tab.filter && (
                <TableauDeBordTab active={currentTab === tab.filter} key={index}>
                  {tab.component}
                </TableauDeBordTab>
              ),
          )}
        </div>
      </div>
    </>
  );
};
