"use client";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { RECHERCHE_GLOBALE_SITE } from "@/src/helpers/matomo/matomo-tags";

type RechercheSuggestionsProps = {
  className?: string;
};

const SEARCH_SUGGESTIONS = [
  { keywords: "végétalisation cour d'école" },
  { keywords: "projet climat méditerranéen" },
  { keywords: "vague de chaleur" },
  { keywords: "isolation batiment" },
  { keywords: "confort thermique ville" },
  { keywords: "retour d'expérience occitanie" },
] as const;

export const RechercheSuggestions = ({ className }: RechercheSuggestionsProps) => {
  return (
    <section className={className}>
      <h2 className="mb-6">Suggestions</h2>
      <ul className="grid max-w-[50rem] grid-cols-1 pl-4 text-lg md:grid-cols-2">
        {SEARCH_SUGGESTIONS.map((suggestion, index) => (
          <li className="mb-3" key={index}>
            <LinkWithoutPrefetch
              onClick={() => trackEvent(RECHERCHE_GLOBALE_SITE(suggestion.keywords))}
              className="fr-link--icon-left fr-icon-search-line"
              href={PFMV_ROUTES.RECHERCHE_GLOBALE(suggestion.keywords)}
            >
              {suggestion.keywords}
            </LinkWithoutPrefetch>
          </li>
        ))}
      </ul>
    </section>
  );
};
