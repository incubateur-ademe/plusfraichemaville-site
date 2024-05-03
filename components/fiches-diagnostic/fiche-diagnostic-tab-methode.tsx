import { Separator } from "../common/separator";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnosticResponse } from "./types";
import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { getCoutFiche } from "@/helpers/coutFiche";
import { getDelaiTravauxFiche } from "@/helpers/delaiTravauxFiche";
import { TypeFiche } from "@/helpers/common";
import clsx from "clsx";
import { getMethodeDiagnosticFromCode } from "@/components/fiches-diagnostic/filters/methode";
import React from "react";
import { getCreditsImageForFicheDiagnostic } from "@/helpers/credits-image";

export const FicheDiagnosticMethodeTab = ({
  ficheDiagnostic,
}: {
  ficheDiagnostic: FicheDiagnosticResponse;
  projetId?: number;
}) => {
  const { attributes } = ficheDiagnostic;
  const coutMin = attributes.cout_min;
  const coutMax = attributes.cout_max;
  const delaiMin = attributes.delai_min;
  const delaiMax = attributes.delai_max;

  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);

  const creditsImage = getCreditsImageForFicheDiagnostic(attributes);

  return (
    <div>
      <div className="md:hidden text-base text-dsfr-text-mention-grey mb-6 relative">
        <i className="ri-bar-chart-fill before:!w-4 mr-1 text-dsfr-background-flat-warning"></i>
        Méthode de diagnostic{" "}
        <span className="font-bold capitalize text-dsfr-background-flat-warning">
          {getMethodeDiagnosticFromCode(attributes.methode)?.label}
        </span>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="max-w-screen-sm">
          <h3 className={clsx("text-2xl md:text-2xl md:hidden")}>{attributes.description_courte}</h3>
          <FicheDiagnosticTabBlocText
            title="Description de la méthode"
            text={attributes.description}
            titleClassName="text-2xl mb-4 hidden md:block"
          />
        </div>
        <div
          className={clsx(
            "h-fit rounded-2xl shrink-0 md:ml-14",
            "md:w-80 md:bg-dsfr-background-alt-red-marianne md:pl-6 md:pt-8 md:pr-4 md:pb-14",
          )}
        >
          <div>
            <small className="mb-1 block text-dsfr-text-mention-grey text-sm">Temporalité</small>
            <div className="flex justify-between">
              <div className="h-4 mr-2">{delai?.icons(TypeFiche.diagnostic, "before:!w-4")}</div>
              <small className="text-dsfr-text-mention-grey text-sm">
                {delaiMin} à {delaiMax} mois
              </small>
            </div>
          </div>
          <Separator className="my-3" />
          <div>
            <small className="mb-1 block text-dsfr-text-mention-grey text-sm">Coût</small>
            <div className="flex justify-between">
              <div className="h-4 mr-2">{cout?.icons(TypeFiche.diagnostic, "before:!w-4")}</div>
              <small className="text-dsfr-text-mention-grey text-sm">
                de {coutMin} à {coutMax} euros HT
              </small>
            </div>
          </div>
          <Separator className="mt-3 mb-5" />
          <div className="text-dsfr-text-mention-grey text-sm">{attributes.explication_source}</div>
        </div>
      </div>
      <Separator className="my-12" />
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <FicheDiagnosticTabBlocText title="Besoin de la collectivité" text={attributes.besoin} small />
        <FicheDiagnosticTabBlocText title="Les indicateurs étudiés" text={attributes.indicateurs} small />
      </div>
      {!!attributes.en_savoir_plus_description && (
        <>
          <Separator className="mt-6 mb-12" />
          <FicheDiagnosticTabBlocText
            title="En savoir plus"
            text={attributes.en_savoir_plus_description}
            textClassName="[&>*]:mb-2"
          />
        </>
      )}
      {attributes.fiches_diagnostics_associees?.data && attributes.fiches_diagnostics_associees.data.length > 0 && (
        <>
          <Separator className="my-12" />
          <div>
            <h3 className="text-2xl mb-1">Méthodologies associées</h3>
            <span className="mb-6 block">Consultez les méthodologies de diagnostic associées</span>
            <div className="px-2 flex flex-wrap gap-6">
              {attributes.fiches_diagnostics_associees?.data.map((ficheDiagnostic) => (
                <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={ficheDiagnostic.id} />
              ))}
            </div>
          </div>
        </>
      )}
      {!!attributes.partenaire && (
        <>
          <Separator className="mt-6 mb-12" />
          <FicheDiagnosticTabBlocText title="Crédits" text={attributes.partenaire} textClassName="[&>*]:mb-2" />
        </>
      )}
      {creditsImage.length > 0 && (
        <>
          <hr className="pb-8 mt-12" />
          <div className="text-dsfr-text-title-grey font-bold mb-4">Crédits images</div>
          <div>{creditsImage.join(", ")}</div>
        </>
      )}
    </div>
  );
};
