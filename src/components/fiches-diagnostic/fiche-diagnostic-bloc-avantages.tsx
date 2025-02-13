import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
export const FicheDiagnosticAvantageBloc = ({ attributes }: { attributes: FicheDiagnostic["attributes"] }) => {
  return (
    <div>
      <h3 className="mb-9 pt-12 text-3xl">Avantages et points de vigilance</h3>
      <div className="flex flex-col gap-8 md:flex-row">
        <FicheDiagnosticBlocText title="Avantages" text={attributes.avantage_description} small />
        <FicheDiagnosticBlocText title="Points de vigilance" text={attributes.vigilance_description} small />
      </div>
    </div>
  );
};
