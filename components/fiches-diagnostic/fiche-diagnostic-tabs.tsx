import clsx from "clsx";
import CustomTabButton from "../common/CustomTabButton";
import { PropsWithChildren } from "react";
const tabs = [
  {
    label: "Méthode",
    contentId: "methode-panel",
    isSelected: true,
  },
  {
    label: "Avantages et points de vigilance",
    contentId: "avantages-et-points-de-vigilance-panel",
    isSelected: false,
  },
  {
    label: "Mise en œuvre",
    contentId: "mise-en-oeuvre-panel",
    isSelected: false,
  },
];

export const FicheDiagnosticTabs = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <div className="bg-pfmv-orange h-14 w-full absolute left-0 top-0"></div>
      <div className="fr-container">
        <div className="fr-tabs !shadow-none before:!shadow-none">
          <ul className="fr-tabs__list !p-0 !pl-40" role="tablist" aria-label="Menu fiche diagnostic">
            {tabs.map((tab) => (
              <li role="presentation" key={tab.contentId}>
                <CustomTabButton {...tab} className="text-black custom-tab-diag" />
              </li>
            ))}
          </ul>
          {tabs.map((tab, index) => (
            <div
              id={tab.contentId}
              className={clsx("customPanel fr-tabs__panel", !index && "fr-tabs__panel--selected")}
              role="tabpanel"
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
