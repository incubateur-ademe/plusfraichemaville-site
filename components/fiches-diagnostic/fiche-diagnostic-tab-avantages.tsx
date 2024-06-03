import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { FicheDiagnosticResponseAttributes } from "./types";

export const FicheDiagnosticAvantageTab = ({ attributes }: { attributes: FicheDiagnosticResponseAttributes }) => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <FicheDiagnosticTabBlocText title="Avantages" text={attributes.avantage_description} small />
      <FicheDiagnosticTabBlocText title="Points de vigilance" text={attributes.vigilance_description} small />
    </div>
  );
};
