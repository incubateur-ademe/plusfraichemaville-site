import { PropsWithChildren, ReactNode } from "react";
import { FicheDiagnosticMethodeTab } from "./fiche-diagnostic-tab-methode";
import { FicheDiagnosticAvantageTab } from "./fiche-diagnostic-tab-avantages";
import { FicheDiagnosticMiseEnOeuvreTab } from "./fiche-diagnostic-tab-meo";
import ButtonShareCurrentUrl from "@/src/components/common/button-share-current-url";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { TypeFiche } from "@/src/helpers/common";
import { Separator } from "../common/separator";
import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { FicheDiagnosticClientTab } from "./fiche-diagnostic-tab-client";
import clsx from "clsx";

type FicheDiagnosticTabsProps = {
  ficheDiagnostic: FicheDiagnostic;
} & PropsWithChildren;

export type FicheDiagnosticTab = {
  label: string;
  contentId: string;
  isSelected: boolean;
  component: ReactNode;
};

export const FicheDiagnosticTabs = ({ ficheDiagnostic }: FicheDiagnosticTabsProps) => {
  const { attributes, id } = ficheDiagnostic;
  const tabs: FicheDiagnosticTab[] = [
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
      <div className="fr-container relative flex flex-col md:flex-row">
        <div
          className={clsx(
            "sticky top-0 z-50 mb-8 flex-none bg-white md:top-12 md:mb-0 md:h-96 md:w-56 md:flex-col md:pt-12",
            "flex shrink-0 flex-col-reverse",
          )}
        >
          <FicheDiagnosticClientTab tabs={tabs} />
          <ButtonShareCurrentUrl className={"mb-2 block md:mb-0 [&>*]:mb-2"} />
          <div className="my-4 md:mb-0 md:mt-4">
            <GenericSaveFiche id={id} type={TypeFiche.diagnostic} withLabel />
          </div>
        </div>
        <div className="border-dsfr-border-default-grey md:border-l-[1px] md:pl-7 md:pt-12">
          {tabs.map((tab) => (
            <>
              <div className="mb-12" id={tab.contentId} key={tab.contentId}>
                {tab.component}
              </div>
              <Separator className="my-12 !h-[1px] !opacity-100" />
            </>
          ))}
          {!!attributes.partenaire && (
            <div className="pb-12">
              <FicheDiagnosticTabBlocText title="Crédits" text={attributes.partenaire} textClassName="[&>*]:mb-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
