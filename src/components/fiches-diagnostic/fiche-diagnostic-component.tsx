import { FicheDiagnosticBlocs } from "./fiche-diagnostic-blocs";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { FicheDiagnosticHeader } from "@/src/components/fiche-diagnostic/fiche-diagnostic-header";

type FicheDiagnosticProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const FicheDiagnosticComponent = ({ ficheDiagnostic }: FicheDiagnosticProps) => {
  return (
    <>
      <link rel="canonical" href={getFullUrl(PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC(ficheDiagnostic.slug))} />
      <FicheDiagnosticHeader ficheDiagnostic={ficheDiagnostic} />
      <FicheDiagnosticBlocs ficheDiagnostic={ficheDiagnostic} />
    </>
  );
};
