import { FicheSolutionFullCardSkeleton } from "../ficheSolution/fiche-solution-full-card-skeleton";
import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";

export const FichesDiagnosticFavoris = ({
  bookmarkedFichesDiagnostic,
}: {
  bookmarkedFichesDiagnostic?: string[] | number[];
}) => {
  return (
    <div className="mt-10 mb-20">
      <div className="fr-h3">Mes méthodes de diagnostic mises en favoris</div>
      {bookmarkedFichesDiagnostic && bookmarkedFichesDiagnostic.length > 0 ? (
        <div className="flex flex-wrap p-0 m-0 gap-6 justify-center lg:justify-normal">
          {bookmarkedFichesDiagnostic.map((ficheDiagnosticId, index) => (
            <FicheDiagnosticCardWithFetcher ficheDiagnosticId={+ficheDiagnosticId} key={index} vertical />
          ))}
        </div>
      ) : (
        <FicheSolutionFullCardSkeleton />
      )}
    </div>
  );
};
