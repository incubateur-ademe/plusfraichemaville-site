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
      <ul className="m-0 flex flex-wrap justify-center gap-6 p-0 lg:justify-normal">
        {fichesDiagnostic.map((ficheDiagnostic) => (
          <li key={ficheDiagnostic.id} className="flex justify-center lg:w-full lg:justify-start">
            <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} />
          </li>
        ))}
      </ul>
    </div>
  );
};
