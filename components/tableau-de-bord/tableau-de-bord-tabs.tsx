"use client";

import { TableauDeBordSuivi, TableauDeBordTab } from ".";
import clsx from "clsx";
import { TableauDeBordRecommandation } from "./tableau-de-bord-recommandations";

import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useParams, useSearchParams } from "next/navigation";

const tabs = [
  {
    label: "Tableau de suivi",
    filter: "tableau-de-suivi",
    component: <TableauDeBordSuivi />,
  },
  {
    label: "Recommandations",
    filter: "recommendation",
    component: <TableauDeBordRecommandation />,
  },
  {
    label: "Option de partage",
    filter: "option-de-partage",
    component: <>Option de partage</>,
  },
];

const getButtonTabClassName = (active: boolean) =>
  clsx(
    "px-6 py-4 text-sm hover:!bg-dsfr-border-action-low-blue-france hover:!text-dsfr-background-flat-blue-france",
    active && "bg-dsfr-border-action-low-blue-france text-dsfr-background-flat-blue-france",
  );

export const TableauDeBordTabs = () => {
  const { projetId } = useParams();
  const params = useSearchParams();
  const currentTab = params.get("tab");

  return (
    <>
      <div className="bg-dsfr-background-alt-blue-france">
        <div className="flex fr-container">
          {tabs.map((tab, index) => (
            <Link
              href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(+projetId, tab.filter)}
              data-index={index}
              className={clsx(getButtonTabClassName(currentTab === tab.filter), "!bg-none")}
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
