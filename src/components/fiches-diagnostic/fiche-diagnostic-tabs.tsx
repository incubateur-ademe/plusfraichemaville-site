import clsx from "clsx";
import CustomTabButton from "../common/CustomTabButton";
import { PropsWithChildren } from "react";
import { FicheDiagnosticMethodeTab } from "./fiche-diagnostic-tab-methode";
import { FicheDiagnosticAvantageTab } from "./fiche-diagnostic-tab-avantages";
import { FicheDiagnosticMiseEnOeuvreTab } from "./fiche-diagnostic-tab-meo";
import ButtonShareCurrentUrl from "@/src/components/common/button-share-current-url";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

type FicheDiagnosticTabsProps = {
  ficheDiagnostic: FicheDiagnostic;
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
      <div className="absolute left-0 top-0 h-14 w-full bg-pfmv-orange"></div>
      <div className="fr-container relative flex flex-row">
        <div className="flex-none md:mt-[6.5rem] md:w-56">
          <ButtonShareCurrentUrl className={"hidden md:block [&>*]:mb-2"} />

          <div className="absolute right-4 top-[68px] md:hidden">
            <GenericSaveFiche id={id} type="diagnostic" />
          </div>
          <div className="mt-4 hidden md:block">
            <GenericSaveFiche id={id} type="diagnostic" withLabel />
          </div>
        </div>
        <div className="fr-tabs !shadow-none before:!shadow-none">
          <ul className="fr-tabs__list !m-0 !h-14 !p-0" role="tablist" aria-label="Menu fiche diagnostic">
            {tabs.map((tab) => (
              <li role="presentation" key={tab.contentId}>
                <CustomTabButton {...tab} className="customTab custom-tab-diag text-black" />
              </li>
            ))}
          </ul>
          {tabs.map((tab, index) => (
            <div
              id={tab.contentId}
              key={tab.contentId}
              className={clsx("fr-tabs__panel !px-0 !pt-14 md:!py-12", !index && "fr-tabs__panel--selected")}
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
