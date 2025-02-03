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
      <div className="fr-container relative flex flex-row">
        <div className="sticky top-12 h-96 flex-none pt-12 md:w-56">
          <FicheDiagnosticClientTab tabs={tabs} />
          <ButtonShareCurrentUrl className={"hidden md:block [&>*]:mb-2"} />
          <div className="absolute right-4 top-[68px] md:hidden">
            <GenericSaveFiche id={id} type={TypeFiche.diagnostic} />
          </div>
          <div className="mt-4 hidden md:block">
            <GenericSaveFiche id={id} type={TypeFiche.diagnostic} withLabel />
          </div>
        </div>
        <div className="border-l-[1px] border-dsfr-border-default-grey pl-7 pt-12">
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
