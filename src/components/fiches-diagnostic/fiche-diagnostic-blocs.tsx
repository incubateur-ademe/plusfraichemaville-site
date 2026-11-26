import { FicheDiagnosticBlocPresentation } from "./fiche-diagnostic-bloc-presentation";
import { FicheDiagnosticMiseEnOeuvreBloc } from "./fiche-diagnostic-bloc-meo";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { Separator } from "../common/separator";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnosticBlocRetourExperience } from "@/src/components/fiches-diagnostic/fiche-diagnostic-bloc-retour-experience";
import { getCreditsImageForFicheDiagnostic } from "@/src/helpers/credits-image";
import { FicheDiagnosticCard } from "@/src/components/fiches-diagnostic/fiche-diagnostic-card";
import { isEmpty } from "@/src/helpers/listUtils";

type FicheDiagnosticBlocsProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const FicheDiagnosticBlocs = ({ ficheDiagnostic }: FicheDiagnosticBlocsProps) => {
  const attributes = ficheDiagnostic;
  const creditsImage = getCreditsImageForFicheDiagnostic(attributes);
  return (
    <div className="fr-container">
      <FicheDiagnosticBlocPresentation ficheDiagnostic={ficheDiagnostic} />
      <Separator className="my-10 !h-[1px] !opacity-100" />
      <div id="retour-experience-diag">
        <FicheDiagnosticBlocRetourExperience ficheDiagnostic={ficheDiagnostic} />
      </div>
      <Separator className="my-10 !h-[1px] !opacity-100" />
      <div id="mise-en-oeuvre">
        <FicheDiagnosticMiseEnOeuvreBloc attributes={attributes} />
      </div>
      <Separator className="my-10 !h-[1px] !opacity-100" />
      {!!attributes.en_savoir_plus_description && (
        <>
          <FicheDiagnosticBlocText title="En savoir plus" text={attributes.en_savoir_plus_description} />
          <Separator className="my-10 !h-[1px] !opacity-100" />
        </>
      )}
      {!isEmpty(attributes.fiches_diagnostics_associees) && (
        <>
          <div>
            <h3 className="mb-1 text-2xl">Méthodologies associées</h3>
            <span className="mb-6 block">Consultez les méthodologies de diagnostic associées</span>
            <div className="flex flex-wrap gap-6">
              {attributes.fiches_diagnostics_associees?.map((ficheDiagnostic) => (
                <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={ficheDiagnostic.documentId} />
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
  );
};
