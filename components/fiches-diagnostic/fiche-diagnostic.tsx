import { FicheDiagnosticHeader } from "./fiche-diagnostic-header";
import { FicheDiagnosticTabs } from "./fiche-diagnostic-tabs";
import { FicheDiagnosticResponse } from "./types";

type FicheDiagnosticProps = {
  ficheDiagnostic: FicheDiagnosticResponse;
};

export const FicheDiagnostic = ({ ficheDiagnostic }: FicheDiagnosticProps) => {
  const attributes = ficheDiagnostic.attributes;

  return (
    <div>
      <FicheDiagnosticHeader attributes={attributes} />
      <FicheDiagnosticTabs />
    </div>
  );
};
