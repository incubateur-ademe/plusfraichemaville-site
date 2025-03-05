import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticAvantageBloc = ({ attributes }: { attributes: FicheDiagnostic["attributes"] }) => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <FicheDiagnosticBlocText title="Avantages" text={attributes.avantage_description} />
      <FicheDiagnosticBlocText title="Points de vigilance" text={attributes.vigilance_description} />
    </div>
  );
};
