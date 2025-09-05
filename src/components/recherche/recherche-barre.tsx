"use client";
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { FUZZY_SEARCH, PFMV_ROUTES } from "@/src/helpers/routes";
import { SearchResult } from "@/src/components/recherche/recherche-types";
import { RechercheResultats } from "@/src/components/recherche/recherche-resultats";
import { useRouter } from "next/navigation";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { RechercheResultatsSkeleton } from "@/src/components/recherche/recherche-resultats-skeleton";
import React from "react";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { RECHERCHE_GLOBALE_SITE } from "@/src/helpers/matomo/matomo-tags";
import useSWRImmutable from "swr/immutable";
import clsx from "clsx";

type RechercheBarreProps = {
  query?: string;
  className?: string;
};

export const RechercheBarre = ({ query, className }: RechercheBarreProps) => {
  const router = useRouter();

  const searchClick = (searchText: string) => {
    if (query) {
      trackEvent(RECHERCHE_GLOBALE_SITE(query));
    }
    router.push(PFMV_ROUTES.RECHERCHE_GLOBALE(searchText));
  };
  const fetcher = (): Promise<SearchResult> =>
    fetch(FUZZY_SEARCH(query)).then((response) => response.json() as Promise<SearchResult>);

  const { data, error, isLoading } = useSWRImmutable<SearchResult>(
    (query?.length || 0) > 0 && FUZZY_SEARCH(query),
    fetcher,
  );
  if (error) {
    captureError(`Erreur lors de la recherche ${query}`, error);
  }
  return (
    <>
      <SearchBar
        className={className}
        big
        onButtonClick={(searchText) => searchClick(searchText)}
        renderInput={({ className, id, placeholder, type }) => (
          <input
            className={clsx(className, error && "fr-input--error")}
            defaultValue={query}
            placeholder={placeholder}
            type={type}
            id={id}
            autoFocus
          />
        )}
        defaultValue={query}
      />
      {error && (
        <div className="mt-6 text-dsfr-text-error">
          {"Une erreur s'est produite pendant la recherche, veuillez réessayer ultérieurement."}
        </div>
      )}
      {isLoading && <RechercheResultatsSkeleton className="mt-10" />}
      {data && query && <RechercheResultats searchResult={data} className="mt-10" />}
    </>
  );
};
