import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticMethodeBloc = ({ ficheDiagnostic }: { ficheDiagnostic: FicheDiagnostic }) => {
  const { attributes } = ficheDiagnostic;

  return (
    <div className="flex flex-col justify-between pt-12 md:flex-row">
      <FicheDiagnosticBlocText title="La méthode" text={attributes.description} />
    </div>
  );
};
