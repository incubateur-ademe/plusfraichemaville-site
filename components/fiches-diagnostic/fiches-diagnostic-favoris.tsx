import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";
import { FichesDiagnosticFavorisEmpty } from "./fiches-diagnostic-favoris-empty";

export const FichesDiagnosticFavoris = ({
  bookmarkedFichesDiagnostic,
}: {
  bookmarkedFichesDiagnostic?: string[] | number[];
}) => {
  return (
    <div className="mb-10">
      <div className="fr-h3">Mes méthodes de diagnostic mises en favoris</div>
      {bookmarkedFichesDiagnostic && bookmarkedFichesDiagnostic.length > 0 ? (
        bookmarkedFichesDiagnostic.map((ficheDiagnosticId, index) => (
          <FicheDiagnosticCardWithFetcher ficheDiagnosticId={+ficheDiagnosticId} key={index} vertical />
        ))
      ) : (
        <FichesDiagnosticFavorisEmpty />
      )}
    </div>
  );
};
