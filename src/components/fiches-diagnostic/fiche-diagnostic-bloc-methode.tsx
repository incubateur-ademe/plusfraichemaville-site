import { Separator } from "../common/separator";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { getCreditsImageForFicheDiagnostic } from "@/src/helpers/credits-image";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticMethodeBloc = ({
  ficheDiagnostic,
}: {
  ficheDiagnostic: FicheDiagnostic;
  projetId?: number;
}) => {
  const { attributes } = ficheDiagnostic;

  const creditsImage = getCreditsImageForFicheDiagnostic(attributes);

  return (
    <>
      <div className="flex flex-col justify-between pt-12 md:flex-row">
        <FicheDiagnosticBlocText title="La méthode" text={attributes.description} titleClassName="text-3xl mb-4" />
      </div>
      <Separator className="mb-8 mt-4 !h-[1px] !opacity-100" />
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <FicheDiagnosticBlocText title="Besoin de la collectivité" text={attributes.besoin} small />
        <FicheDiagnosticBlocText title="Les indicateurs étudiés" text={attributes.indicateurs} small />
      </div>
      {!!attributes.en_savoir_plus_description && (
        <>
          <Separator className="mb-12 mt-6 !h-[1px] !opacity-100" />
          <FicheDiagnosticBlocText
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
