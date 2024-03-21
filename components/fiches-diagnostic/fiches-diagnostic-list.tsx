import { FichesDiagnosticResponse } from "./types";

type FichesDiagnosticListProps = {
  fichesDiagnostic: FichesDiagnosticResponse;
};

export const FichesDiagnosticList = ({ fichesDiagnostic }: FichesDiagnosticListProps) => {
  return fichesDiagnostic.length === 0 ? (
    <div className="text-xl font-bold">Aucune fiche solution ne correspond à vos critères.</div>
  ) : (
    <div className="grow list-none p-0">
      <ul className="flex flex-wrap gap-6 justify-center md:justify-normal">
        {fichesDiagnostic.map((ficheDiagnostic) => (
          <li key={ficheDiagnostic.id} className="flex"></li>
        ))}
      </ul>
    </div>
  );
};
