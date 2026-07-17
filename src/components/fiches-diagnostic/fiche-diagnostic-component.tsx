import { FicheDiagnosticHeader } from "./fiche-diagnostic-header";
import { FicheDiagnosticBlocs } from "./fiche-diagnostic-blocs";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";

type FicheDiagnosticProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const FicheDiagnosticComponent = ({ ficheDiagnostic }: FicheDiagnosticProps) => {
  return (
    <>
      <link
        rel="canonical"
        href={getFullUrl(PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC(ficheDiagnostic.attributes.slug))}
      />
      <FicheDiagnosticHeader ficheDiagnostic={ficheDiagnostic} />
      <FicheDiagnosticBlocs ficheDiagnostic={ficheDiagnostic} />
    </>
  );
};
