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
      <div className="fr-container fr-mb-7w">
        <FicheDiagnosticBlocPresentation ficheDiagnostic={ficheDiagnostic} />
      </div>
      <FicheDiagnosticBlocRetourExperience ficheDiagnostic={ficheDiagnostic} />
      <div className="fr-container fr-my-7w">
        <FicheDiagnosticMiseEnOeuvreBloc attributes={attributes} />
      </div>
      <div className="fr-container">
        {!!attributes.en_savoir_plus_description && (
          <FicheDiagnosticBlocText title="En savoir plus" text={attributes.en_savoir_plus_description} />
        )}
        {!!attributes.partenaire && (
          <div className="fr-mt-7w pb-12">
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
        <div className="fr-p-7w bg-dsfr-background-alt-yellow-tournesol">
          <div className="fr-container flex flex-col items-center">
            <h2 className="fr-h2 !mb-0">
              {attributes.fiches_diagnostics_associees.length > 1
                ? `${attributes.fiches_diagnostics_associees.length} diagnostics associés`
                : "Diagnostic associé"}
            </h2>
            <div className="fr-my-6w flex flex-wrap gap-6">
              {attributes.fiches_diagnostics_associees?.map((ficheDiagnostic) => (
                <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={ficheDiagnostic.documentId} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
