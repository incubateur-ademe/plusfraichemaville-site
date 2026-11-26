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
    <div>
      <div className="fr-container">
        <FicheDiagnosticBlocPresentation ficheDiagnostic={ficheDiagnostic} />
      </div>
      <FicheDiagnosticBlocRetourExperience ficheDiagnostic={ficheDiagnostic} />
      <div className="fr-container">
        <FicheDiagnosticMiseEnOeuvreBloc attributes={attributes} />
      </div>
      <div className="fr-container">
        {!!attributes.en_savoir_plus_description && (
          <FicheDiagnosticBlocText title="En savoir plus" text={attributes.en_savoir_plus_description} />
        )}
        {!!attributes.partenaire && (
          <div className="pb-12">
            <FicheDiagnosticBlocText title="Crédits" text={attributes.partenaire} />
          </div>
        )}
        {creditsImage.length > 0 && (
          <>
            <FicheDiagnosticBlocText title="Crédits images" />
            <div>{creditsImage.join(", ")}</div>
            <Separator className="my-10 !h-[1px] !opacity-100" />
          </>
        )}
      </div>
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
    </div>
  );
};
