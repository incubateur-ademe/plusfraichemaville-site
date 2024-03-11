"use client";

import { TableauDeBordSuivi, TableauDeBordTab } from ".";
import clsx from "clsx";
import { TableauDeBordRecommandation } from "./tableau-de-bord-recommandations";

import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useParams, useSearchParams } from "next/navigation";

const getButtonTabClassName = (active: boolean) =>
  clsx(
    "px-6 py-4 text-sm hover:!bg-dsfr-border-action-low-blue-france hover:!text-dsfr-background-flat-blue-france",
    active && "bg-dsfr-border-action-low-blue-france text-dsfr-background-flat-blue-france",
  );

export const TableauDeBordTabs = () => {
  const { projetId } = useParams();
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
      label: "Option de partage",
      filter: "option-de-partage",
      component: <>Option de partage</>,
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
                tab.filter === "recommandation" && `after:content-[attr(data-index)]`,
                tab.filter === "recommandation" &&
                  "after:absolute after:top-1 after:text-[10px] after:bg-dsfr-background-flat-blue-france",
                tab.filter === "recommandation" &&
                  "after:text-white after:rounded-full after:w-[20px] after:h-[20px] after:flex after:justify-center",
                tab.filter === "recommandation" && "after:items-center after:right-2",
              )}
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
