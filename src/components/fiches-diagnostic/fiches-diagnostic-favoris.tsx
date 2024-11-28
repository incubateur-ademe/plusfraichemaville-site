import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";
import { FichesDiagnosticFavorisEmpty } from "./fiches-diagnostic-favoris-empty";

export const FichesDiagnosticFavoris = ({
  bookmarkedFichesDiagnostic,
}: {
  bookmarkedFichesDiagnostic?: string[] | number[];
}) => {
  return (
    <div>
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
