import { FicheDiagnosticHeader } from "./fiche-diagnostic-header";
import { FicheDiagnosticTabs } from "./fiche-diagnostic-tabs";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

type FicheDiagnosticProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const FicheDiagnosticComponent = ({ ficheDiagnostic }: FicheDiagnosticProps) => {
  const attributes = ficheDiagnostic.attributes;

  return (
    <div>
      <FicheDiagnosticHeader attributes={attributes} />
      <FicheDiagnosticTabs ficheDiagnostic={ficheDiagnostic} />
    </div>
  );
};
