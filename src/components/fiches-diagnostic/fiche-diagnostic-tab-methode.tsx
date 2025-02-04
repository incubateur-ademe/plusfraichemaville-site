import { Separator } from "../common/separator";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import clsx from "clsx";

import { getCreditsImageForFicheDiagnostic } from "@/src/helpers/credits-image";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticMethodeTab = ({
  ficheDiagnostic,
}: {
  ficheDiagnostic: FicheDiagnostic;
  projetId?: number;
}) => {
  const { attributes } = ficheDiagnostic;

  const creditsImage = getCreditsImageForFicheDiagnostic(attributes);

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row">
        <h3 className={clsx("text-2xl md:hidden md:text-2xl")}>{attributes.description_courte}</h3>
        <FicheDiagnosticTabBlocText
          title="La méthode"
          text={attributes.description}
          titleClassName="text-2xl mb-4 hidden md:block"
        />
      </div>
      <Separator className="mb-8 mt-4 !h-[1px] !opacity-100" />
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <FicheDiagnosticTabBlocText title="Besoin de la collectivité" text={attributes.besoin} small />
        <FicheDiagnosticTabBlocText title="Les indicateurs étudiés" text={attributes.indicateurs} small />
      </div>
      {!!attributes.en_savoir_plus_description && (
        <>
          <Separator className="mb-12 mt-6 !h-[1px] !opacity-100" />
          <FicheDiagnosticTabBlocText
            title="En savoir plus"
            text={attributes.en_savoir_plus_description}
            textClassName="[&>*]:mb-2"
          />
        </>
      )}
      {attributes.fiches_diagnostics_associees?.data && attributes.fiches_diagnostics_associees.data.length > 0 && (
        <>
          <Separator className="my-12 !h-[1px] !opacity-100" />
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

      {creditsImage.length > 0 && (
        <>
          <hr className="mt-12 pb-8" />
          <div className="mb-4 font-bold text-dsfr-text-title-grey">Crédits images</div>
          <div>{creditsImage.join(", ")}</div>
        </>
      )}
    </>
  );
};
