import { FicheDiagnosticHeader } from "./fiche-diagnostic-header";
import { FicheDiagnosticBlocs } from "./fiche-diagnostic-blocs";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

type FicheDiagnosticProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const FicheDiagnosticComponent = ({ ficheDiagnostic }: FicheDiagnosticProps) => {
  return (
    <>
      <FicheDiagnosticHeader ficheDiagnostic={ficheDiagnostic} />
      <FicheDiagnosticBlocs ficheDiagnostic={ficheDiagnostic} />
    </>
  );
};
