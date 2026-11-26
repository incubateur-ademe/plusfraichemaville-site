import CallOut from "@codegouvfr/react-dsfr/CallOut";
import CmsRichText from "../common/CmsRichText";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

const leftCellClassName = "md:border-r md:border-dsfr-border-default-grey md:pr-12";
const rightCellClassName = "md:pl-12";

export const FicheDiagnosticBlocPresentation = ({ ficheDiagnostic }: { ficheDiagnostic: FicheDiagnostic }) => {
  return (
    <div className="pt-12">
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
        <div id="methode" className={leftCellClassName}>
          <FicheDiagnosticBlocText title="Méthode" text={ficheDiagnostic.description} />
        </div>
        <div id="besoin" className={rightCellClassName}>
          <FicheDiagnosticBlocText title="Besoin" text={ficheDiagnostic.besoin} />
        </div>
        <div id="indicateurs" className={leftCellClassName}>
          <FicheDiagnosticBlocText title="Indicateurs étudiés" text={ficheDiagnostic.indicateurs} />
        </div>
        <div id="avantages" className={rightCellClassName}>
          <FicheDiagnosticBlocText title="Avantages" text={ficheDiagnostic.avantage_description} />
        </div>
      </div>
      {!!ficheDiagnostic.vigilance_description && (
        <CallOut
          id="points-de-vigilance"
          title="Points de vigilance"
          iconId="ri-alert-line"
          titleAs="h2"
          className="mt-10"
          classes={{title: "fr-h4",text: "ml-4", root: "before:text-dsfr-border-default-blue-cumulus bg-dsfr-beige-galet"}}
          colorVariant="blue-cumulus"
        >
          <CmsRichText label={ficheDiagnostic.vigilance_description} />
        </CallOut>
      )}
    </div>
  );
};
