import { FicheDiagnosticHeader } from "./fiche-diagnostic-header";
import { FicheDiagnosticBlocs } from "./fiche-diagnostic-blocs";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

type FicheDiagnosticProps = {
  ficheDiagnostic: FicheDiagnostic;
  overrideUtilite?: FicheDiagnosticUtilite;
};

export const FicheDiagnosticComponent = ({ ficheDiagnostic, overrideUtilite }: FicheDiagnosticProps) => {
  return (
    <div className="-mb-40">
      <FicheDiagnosticHeader ficheDiagnostic={ficheDiagnostic} overrideUtiliteFiche={overrideUtilite} />
      <FicheDiagnosticBlocs ficheDiagnostic={ficheDiagnostic} />
    </div>
  );
};
