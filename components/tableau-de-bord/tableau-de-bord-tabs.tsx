"use client";
import { useState } from "react";

import { TableauDeBordSuivi, TableauDeBordTab } from ".";
import clsx from "clsx";

const tabs = ["Tableau de suivi", "Recommandations", "Option de partage"];

const getButtonTabClassName = (index: number, activeTab: number) =>
  clsx(
    "px-6 py-4 text-sm hover:!bg-dsfr-border-action-low-blue-france hover:!text-dsfr-background-flat-blue-france",
    index === activeTab && "bg-dsfr-border-action-low-blue-france text-dsfr-background-flat-blue-france",
  );

export const TableauDeBordTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="bg-dsfr-background-alt-blue-france">
        <div className="flex fr-container">
          {tabs.map((tab, index) => (
            <button
              className={getButtonTabClassName(index, activeTab)}
              onClick={() => setActiveTab(index)}
              key={`button-tab-${index}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs bg-dsfr-border-action-low-blue-france min-h-[40rem] py-10">
        <div className="fr-container">
          <TableauDeBordTab active={activeTab === 0}>
            <TableauDeBordSuivi />
          </TableauDeBordTab>
          <TableauDeBordTab active={activeTab === 1}>Recommandations</TableauDeBordTab>
          <TableauDeBordTab active={activeTab === 2}>Option de partage</TableauDeBordTab>
        </div>
      </div>
    </>
  );
};
