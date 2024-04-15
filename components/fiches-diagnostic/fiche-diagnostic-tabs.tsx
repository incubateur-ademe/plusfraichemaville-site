import clsx from "clsx";
import CustomTabButton from "../common/CustomTabButton";
import { PropsWithChildren } from "react";
import { FicheDiagnosticResponse } from "./types";
import { FicheDiagnosticMethodeTab } from "./fiche-diagnostic-tab-methode";
import { FicheDiagnosticAvantageTab } from "./fiche-diagnostic-tab-avantages";
import { FicheDiagnosticMiseEnOeuvreTab } from "./fiche-diagnostic-tab-meo";
import ButtonShareCurrentUrl from "@/components/common/button-share-current-url";
import { GenericSaveFiche } from "../common/generic-save-fiche";

type FicheDiagnosticTabsProps = {
  ficheDiagnostic: FicheDiagnosticResponse;
} & PropsWithChildren;

export const FicheDiagnosticTabs = ({ ficheDiagnostic }: FicheDiagnosticTabsProps) => {
  const { attributes, id } = ficheDiagnostic;
  const tabs = [
    {
      label: "Méthode",
      contentId: "methode-panel",
      isSelected: true,
      component: <FicheDiagnosticMethodeTab ficheDiagnostic={ficheDiagnostic} />,
    },
    {
      label: "Avantages et points de vigilance",
      contentId: "avantages-et-points-de-vigilance-panel",
      isSelected: false,
      component: <FicheDiagnosticAvantageTab attributes={attributes} />,
    },
    {
      label: "Mise en œuvre",
      contentId: "mise-en-oeuvre-panel",
      isSelected: false,
      component: <FicheDiagnosticMiseEnOeuvreTab attributes={attributes} />,
    },
  ];
  return (
    <div className="relative">
      <div className="bg-pfmv-orange h-14 w-full absolute left-0 top-0"></div>
      <div className="relative fr-container flex flex-row">
        <div className="flex-none md:w-56 md:mt-[6.5rem]">
          <ButtonShareCurrentUrl className={"hidden md:block [&>*]:mb-2"} />

          <div
            className={clsx(
              "absolute right-3 top-[55px] w-44 lg:left-6 md:top-[148px] md:right-[unset]",
              "[&>*]:right-[unset] md:[&>*]:top-0",
            )}
          >
            <GenericSaveFiche id={id} type="diagnostic" withLabel />
          </div>
        </div>
        <div className="fr-tabs !shadow-none before:!shadow-none">
          <ul className="fr-tabs__list !m-0 !p-0 !h-14" role="tablist" aria-label="Menu fiche diagnostic">
            {tabs.map((tab) => (
              <li role="presentation" key={tab.contentId}>
                <CustomTabButton {...tab} className="text-black custom-tab-diag" />
              </li>
            ))}
          </ul>
          {tabs.map((tab, index) => (
            <div
              id={tab.contentId}
              key={tab.contentId}
              className={clsx("customPanel customPanelDiag fr-tabs__panel", !index && "fr-tabs__panel--selected")}
              role="tabpanel"
            >
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
