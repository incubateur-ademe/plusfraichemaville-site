import { Fragment, PropsWithChildren, ReactNode } from "react";
import { FicheDiagnosticMethodeBloc } from "./fiche-diagnostic-bloc-methode";
import { FicheDiagnosticAvantageBloc } from "./fiche-diagnostic-bloc-avantages";
import { FicheDiagnosticMiseEnOeuvreBloc } from "./fiche-diagnostic-bloc-meo";
import ButtonShareCurrentUrl from "@/src/components/common/button-share-current-url";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { TypeFiche } from "@/src/helpers/common";
import { Separator } from "../common/separator";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnosticClientBloc } from "./fiche-diagnostic-bloc-client";
import clsx from "clsx";

type FicheDiagnosticBlocsProps = {
  ficheDiagnostic: FicheDiagnostic;
} & PropsWithChildren;

export type FicheDiagnosticBloc = {
  label: string;
  contentId: string;
  isSelected: boolean;
  component: ReactNode;
};

export const FicheDiagnosticBlocs = ({ ficheDiagnostic }: FicheDiagnosticBlocsProps) => {
  const { attributes, id } = ficheDiagnostic;
  const blocs: FicheDiagnosticBloc[] = [
    {
      label: "La méthode",
      contentId: "methode",
      isSelected: true,
      component: <FicheDiagnosticMethodeBloc ficheDiagnostic={ficheDiagnostic} />,
    },
    {
      label: "Avantages et points de vigilance",
      contentId: "avantages-et-points-de-vigilance",
      isSelected: false,
      component: <FicheDiagnosticAvantageBloc attributes={attributes} />,
    },
    {
      label: "Mise en œuvre",
      contentId: "mise-en-oeuvre",
      isSelected: false,
      component: <FicheDiagnosticMiseEnOeuvreBloc attributes={attributes} />,
    },
  ];
  return (
    <div className="relative">
      <div className="fr-container relative flex flex-col-reverse md:flex-row">
        <div
          className={clsx(
            "sticky bottom-0 top-[unset] z-50 mb-8 flex flex-none shrink-0 flex-col-reverse bg-white",
            "pb-4 md:bottom-[unset] md:top-12 md:mb-0 md:h-full md:w-56 md:flex-col md:pt-12",
          )}
        >
          <FicheDiagnosticClientBloc blocs={blocs} />
          <ButtonShareCurrentUrl className={"mb-2 block pl-4 md:mb-0 [&>*]:mb-2"} />
          <div className="my-4 pl-4 md:mb-0 md:mt-4">
            <GenericSaveFiche id={id} type={TypeFiche.diagnostic} withLabel />
          </div>
        </div>
        <div className="border-dsfr-border-default-grey pt-4 md:border-l-[1px] md:pl-7 md:pt-0">
          {blocs.map((tab) => (
            <Fragment key={tab.contentId}>
              <div className="mb-12" id={tab.contentId}>
                {tab.component}
              </div>
              <Separator className="mt-12 !h-[1px] !opacity-100" />
            </Fragment>
          ))}
          {!!attributes.partenaire && (
            <div className="py-12">
              <FicheDiagnosticBlocText title="Crédits" text={attributes.partenaire} textClassName="[&>*]:mb-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
