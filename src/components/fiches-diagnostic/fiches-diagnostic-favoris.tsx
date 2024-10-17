import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";
import { FichesDiagnosticFavorisEmpty } from "./fiches-diagnostic-favoris-empty";

export const FichesDiagnosticFavoris = ({
  bookmarkedFichesDiagnostic,
}: {
  bookmarkedFichesDiagnostic?: string[] | number[];
}) => {
  return (
    <div className="mb-20">
      <div className="fr-h3">Mes méthodes de diagnostic mises en favoris</div>
      {bookmarkedFichesDiagnostic && bookmarkedFichesDiagnostic.length > 0 ? (
        <div className="m-0 flex flex-wrap justify-center gap-6 p-0 lg:justify-normal">
          {bookmarkedFichesDiagnostic.map((ficheDiagnosticId, index) => (
            <FicheDiagnosticCardWithFetcher ficheDiagnosticId={+ficheDiagnosticId} key={index} vertical />
          ))}
        </div>
      ) : (
        <FichesDiagnosticFavorisEmpty />
      )}
    </div>
  );
};
