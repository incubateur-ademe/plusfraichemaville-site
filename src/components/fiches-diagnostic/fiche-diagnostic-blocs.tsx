import { Fragment, PropsWithChildren, ReactNode } from "react";
import { FicheDiagnosticMethodeBloc } from "./fiche-diagnostic-bloc-methode";
import { FicheDiagnosticAvantageBloc } from "./fiche-diagnostic-bloc-avantages";
import { FicheDiagnosticMiseEnOeuvreBloc } from "./fiche-diagnostic-bloc-meo";
import ButtonShareUrl from "@/src/components/common/button-share-url";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { TypeFiche } from "@/src/helpers/common";
import { Separator } from "../common/separator";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnosticSideMenu } from "./fiche-diagnostic-side-menu";
import clsx from "clsx";
// eslint-disable-next-line max-len
import { FicheDiagnosticBlocBesoinEtIndicateurs } from "@/src/components/fiches-diagnostic/fiche-diagnostic-bloc-besoin-et-indicateurs";
// eslint-disable-next-line max-len
import { FicheDiagnosticBlocRetourExperience } from "@/src/components/fiches-diagnostic/fiche-diagnostic-bloc-retour-experience";
import { getCreditsImageForFicheDiagnostic } from "@/src/helpers/credits-image";
import { FicheDiagnosticCard } from "@/src/components/fiches-diagnostic/fiche-diagnostic-card";
import { isEmpty } from "@/src/helpers/listUtils";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";

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
          <GenericSaveFiche id={id} type={TypeFiche.diagnostic} withLabel className={"mb-2 ml-2 block md:mb-0"} />
          <ButtonShareUrl
            url={getFullUrl(PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC(attributes.slug))}
            className="my-4 pl-4 md:mb-0 md:mt-4"
          />
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
              <FicheDiagnosticBlocText title="En savoir plus" text={attributes.en_savoir_plus_description} />
              <Separator className="my-10 !h-[1px] !opacity-100" />
            </>
          )}
          {!isEmpty(attributes.fiches_diagnostics_associees?.data) && (
            <>
              <div>
                <h3 className="mb-1 text-2xl">Méthodologies associées</h3>
                <span className="mb-6 block">Consultez les méthodologies de diagnostic associées</span>
                <div className="flex flex-wrap gap-6">
                  {attributes.fiches_diagnostics_associees?.data.map((ficheDiagnostic) => (
                    <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={ficheDiagnostic.id} />
                  ))}
                </div>
              </div>
              <Separator className="my-10 !h-[1px] !opacity-100" />
            </>
          )}
          {creditsImage.length > 0 && (
            <>
              <FicheDiagnosticBlocText title="Crédits images" />
              <div>{creditsImage.join(", ")}</div>
              <Separator className="my-10 !h-[1px] !opacity-100" />
            </>
          )}

          {!!attributes.partenaire && (
            <div className="pb-12">
              <FicheDiagnosticBlocText title="Crédits" text={attributes.partenaire} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
