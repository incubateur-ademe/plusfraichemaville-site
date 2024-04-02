import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FichesDiagnosticResponse } from "./types";

type FichesDiagnosticListProps = {
  fichesDiagnostic: FichesDiagnosticResponse;
};

export const FichesDiagnosticList = ({ fichesDiagnostic }: FichesDiagnosticListProps) => {
  return fichesDiagnostic.length === 0 ? (
    <div className="text-xl font-bold">Aucune méthode de diagnostic ne correspond à vos critères.</div>
  ) : (
    <div className="grow list-none p-0">
      <ul className="flex flex-wrap p-0 m-0 gap-6 justify-center md:justify-normal">
        {fichesDiagnostic.map((ficheDiagnostic) => (
          <li key={ficheDiagnostic.id} className="flex">
            <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} />
          </li>
        ))}
      </ul>
    </div>
  );
};
