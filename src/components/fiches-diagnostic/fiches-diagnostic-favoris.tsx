import { FavorisAccordion } from "../ficheSolution/fiches-solutions-favoris-accordion";
import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";
import { FichesDiagnosticFavorisEmpty } from "./fiches-diagnostic-favoris-empty";

export const FichesDiagnosticFavoris = ({
  bookmarkedFichesDiagnostic,
}: {
  bookmarkedFichesDiagnostic?: string[] | number[];
}) => {
  return bookmarkedFichesDiagnostic && bookmarkedFichesDiagnostic.length > 0 ? (
    <FavorisAccordion count={bookmarkedFichesDiagnostic.length} type="diagnostic">
      <div className="m-0 flex flex-wrap justify-center gap-6 p-0 py-2 lg:justify-normal">
        {bookmarkedFichesDiagnostic.map((ficheDiagnosticId, index) => (
          <FicheDiagnosticCardWithFetcher ficheDiagnosticId={+ficheDiagnosticId} key={index} vertical />
        ))}
      </div>
    </FavorisAccordion>
  ) : (
    <FichesDiagnosticFavorisEmpty />
  );
};
