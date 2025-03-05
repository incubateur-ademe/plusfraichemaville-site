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
import { FicheDiagnosticSideMenu } from "./fiche-diagnostic-side-menu";
import clsx from "clsx";
import { FicheDiagnosticBlocBesoinEtIndicateurs } from "@/src/components/fiches-diagnostic/fiche-diagnostic-bloc-besoin-et-indicateurs";
import { FicheDiagnosticBlocRetourExperience } from "@/src/components/fiches-diagnostic/fiche-diagnostic-bloc-retour-experience";
import { getCreditsImageForFicheDiagnostic } from "@/src/helpers/credits-image";
import { FicheDiagnosticCard } from "@/src/components/fiches-diagnostic/fiche-diagnostic-card";

type FicheDiagnosticBlocsProps = {
  ficheDiagnostic: FicheDiagnostic;
} & PropsWithChildren;

export type FicheDiagnosticBloc = {
  label: string;
  contentId: string;
  component: ReactNode;
};

export const FicheDiagnosticBlocs = ({ ficheDiagnostic }: FicheDiagnosticBlocsProps) => {
  const { attributes, id } = ficheDiagnostic;
  const creditsImage = getCreditsImageForFicheDiagnostic(attributes);
  const blocs: FicheDiagnosticBloc[] = [
    {
      label: "La méthode",
      contentId: "methode",
      component: <FicheDiagnosticMethodeBloc ficheDiagnostic={ficheDiagnostic} />,
    },
    {
      label: "Le besoin et les indicateurs étudiés",
      contentId: "besoins-et-indicateurs",
      component: <FicheDiagnosticBlocBesoinEtIndicateurs ficheDiagnostic={ficheDiagnostic} />,
    },
    {
      label: "Avantages et points de vigilance",
      contentId: "avantages-et-points-de-vigilance",
      component: <FicheDiagnosticAvantageBloc attributes={attributes} />,
    },
    {
      label: "Projets de diagnostics réalisés",
      contentId: "retour-experience-diag",
      component: <FicheDiagnosticBlocRetourExperience ficheDiagnostic={ficheDiagnostic} />,
    },
    {
      label: "Mise en œuvre",
      contentId: "mise-en-oeuvre",
      component: <FicheDiagnosticMiseEnOeuvreBloc attributes={attributes} />,
    },
  ];
  return (
    <div className="relative">
      <div className="fr-container relative flex flex-col-reverse md:flex-row">
        <div
          className={clsx(
            "sticky bottom-0 top-[unset] z-50 mb-8 flex flex-none shrink-0 flex-col-reverse bg-white",
            "pb-4 md:bottom-[unset] md:top-12 md:mb-0 md:h-full md:w-56 md:flex-col md:pt-10",
          )}
        >
          <FicheDiagnosticSideMenu blocs={blocs} />
          <ButtonShareCurrentUrl className={"mb-2 block pl-4 md:mb-0 [&>*]:mb-2"} />
          <div className="my-4 pl-4 md:mb-0 md:mt-4">
            <GenericSaveFiche id={id} type={TypeFiche.diagnostic} withLabel />
          </div>
        </div>
        <div className="border-dsfr-border-default-grey pt-4 md:border-l-[1px] md:pl-7 md:pt-0">
          {blocs.map((tab) => (
            <Fragment key={tab.contentId}>
              <div id={tab.contentId}>{tab.component}</div>
              <Separator className="my-10 !h-[1px] !opacity-100" />
            </Fragment>
          ))}

          {!!attributes.en_savoir_plus_description && (
            <>
              <Separator className="mb-12 mt-6 !h-[1px] !opacity-100" />
              <FicheDiagnosticBlocText title="En savoir plus" text={attributes.en_savoir_plus_description} />
            </>
          )}
          {attributes.fiches_diagnostics_associees?.data && attributes.fiches_diagnostics_associees.data.length > 0 && (
            <>
              <Separator className="my-12 !h-[1px] !opacity-100" />
              <div>
                <h3 className="mb-1 text-2xl">Méthodologies associées</h3>
                <span className="mb-6 block">Consultez les méthodologies de diagnostic associées</span>
                <div className="flex flex-wrap gap-6">
                  {attributes.fiches_diagnostics_associees?.data.map((ficheDiagnostic) => (
                    <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={ficheDiagnostic.id} />
                  ))}
                </div>
              </div>
            </>
          )}
          {creditsImage.length > 0 && (
            <>
              <hr className="mt-12 pb-8" />
              <div className="mb-4 font-bold text-dsfr-text-title-grey">Crédits images</div>
              <div>{creditsImage.join(", ")}</div>
            </>
          )}

          {!!attributes.partenaire && (
            <div className="py-12">
              <FicheDiagnosticBlocText title="Crédits" text={attributes.partenaire} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
