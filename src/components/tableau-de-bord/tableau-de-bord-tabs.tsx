"use client";

import { TableauDeBordSuivi, TableauDeBordTab } from ".";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

export const TableauDeBordTabs = () => {
  const params = useSearchParams();
  const currentTab = params.get("tab");

  const tabs = [
    {
      filter: "tableau-de-suivi",
      component: <TableauDeBordSuivi />,
      className: "bg-dsfr-border-action-low-blue-france",
    },
  ];

  return (
    <>
      {tabs.map(
        (tab) =>
          currentTab === tab.filter && (
            <div className={clsx(tab.className, "tabs -mb-40 min-h-[40rem] pb-40 pt-10")} key={tab.filter}>
              <div className="fr-container">
                <TableauDeBordTab>{tab.component}</TableauDeBordTab>
              </div>
            </div>
          ),
      )}
    </>
  );
};
