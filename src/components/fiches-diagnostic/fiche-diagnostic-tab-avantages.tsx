import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticAvantageTab = ({ attributes }: { attributes: FicheDiagnostic["attributes"] }) => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <FicheDiagnosticTabBlocText title="Avantages" text={attributes.avantage_description} small />
      <FicheDiagnosticTabBlocText title="Points de vigilance" text={attributes.vigilance_description} small />
    </div>
  );
};
