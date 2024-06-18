import { Separator } from "../common/separator";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnosticResponse } from "./types";
import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { getCoutFiche } from "@/helpers/cout/cout-fiche-solution";
import { getDelaiTravauxFiche } from "@/helpers/delaiTravauxFiche";
import { TypeFiche, formatNumberWithSpaces } from "@/helpers/common";
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
      <div className="relative mb-6 text-base text-dsfr-text-mention-grey md:hidden">
        <i className="ri-bar-chart-fill mr-1 text-dsfr-background-flat-warning before:!w-4"></i>
        Méthode de diagnostic{" "}
        <span className="font-bold capitalize text-dsfr-background-flat-warning">
          {getMethodeDiagnosticFromCode(attributes.methode)?.label}
        </span>
      </div>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="max-w-screen-sm">
          <h3 className={clsx("text-2xl md:hidden md:text-2xl")}>{attributes.description_courte}</h3>
          <FicheDiagnosticTabBlocText
            title="Description de la méthode"
            text={attributes.description}
            titleClassName="text-2xl mb-4 hidden md:block"
          />
        </div>
        <div
          className={clsx(
            "h-fit shrink-0 rounded-2xl md:ml-14",
            "md:w-80 md:bg-dsfr-background-alt-red-marianne md:pb-14 md:pl-6 md:pr-4 md:pt-8",
          )}
        >
          <div>
            <small className="mb-1 block text-sm text-dsfr-text-mention-grey">Temporalité</small>
            <div className="flex justify-between">
              <div className="mr-2 h-4">{delai?.icons(TypeFiche.diagnostic, "before:!w-4")}</div>
              <small className="text-sm text-dsfr-text-mention-grey">
                {delaiMin} à {delaiMax} mois
              </small>
            </div>
          </div>
          <Separator className="my-3" />
          <div>
            <small className="mb-1 block text-sm text-dsfr-text-mention-grey">Coût</small>
            <div className="flex justify-between">
              <div className="mr-2 h-4">{cout?.icons(TypeFiche.diagnostic, "before:!w-4")}</div>
              <small className="text-sm text-dsfr-text-mention-grey">
                de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} euros HT
              </small>
            </div>
          </div>
          <Separator className="mb-5 mt-3" />
          <div className="text-sm text-dsfr-text-mention-grey">{attributes.explication_source}</div>
        </div>
      </div>
      <Separator className="my-12" />
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <FicheDiagnosticTabBlocText title="Besoin de la collectivité" text={attributes.besoin} small />
        <FicheDiagnosticTabBlocText title="Les indicateurs étudiés" text={attributes.indicateurs} small />
      </div>
      {!!attributes.en_savoir_plus_description && (
        <>
          <Separator className="mb-12 mt-6" />
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
            <h3 className="mb-1 text-2xl">Méthodologies associées</h3>
            <span className="mb-6 block">Consultez les méthodologies de diagnostic associées</span>
            <div className="flex flex-wrap gap-6 px-2">
              {attributes.fiches_diagnostics_associees?.data.map((ficheDiagnostic) => (
                <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={ficheDiagnostic.id} />
              ))}
            </div>
          </div>
        </>
      )}
      {!!attributes.partenaire && (
        <>
          <Separator className="mb-12 mt-6" />
          <FicheDiagnosticTabBlocText title="Crédits" text={attributes.partenaire} textClassName="[&>*]:mb-2" />
        </>
      )}
      {creditsImage.length > 0 && (
        <>
          <hr className="mt-12 pb-8" />
          <div className="mb-4 font-bold text-dsfr-text-title-grey">Crédits images</div>
          <div>{creditsImage.join(", ")}</div>
        </>
      )}
    </div>
  );
};
