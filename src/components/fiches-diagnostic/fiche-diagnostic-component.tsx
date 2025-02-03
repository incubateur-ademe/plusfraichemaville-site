import { FicheDiagnosticHeader } from "./fiche-diagnostic-header";
import { FicheDiagnosticTabs } from "./fiche-diagnostic-tabs";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

type FicheDiagnosticProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const FicheDiagnosticComponent = ({ ficheDiagnostic }: FicheDiagnosticProps) => {
  return (
    <div className="-mb-40">
      <FicheDiagnosticHeader ficheDiagnostic={ficheDiagnostic} />
      <FicheDiagnosticTabs ficheDiagnostic={ficheDiagnostic} />
    </div>
  );
};
