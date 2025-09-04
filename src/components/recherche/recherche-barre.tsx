"use client";
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { FUZZY_SEARCH } from "@/src/helpers/routes";
import { SearchResult } from "@/src/components/recherche/recherche-types";
import { RechercheResultats } from "@/src/components/recherche/recherche-resultats";
import { useState } from "react";

type RechercheBarreProps = {
  className?: string;
};

export const RechercheBarre = ({ className }: RechercheBarreProps) => {
  const [searchResults, setsearchResults] = useState<SearchResult>();
  const globalSearch = (inputValue: string) => {
    if (inputValue?.trim().length > 2) {
      fetch(FUZZY_SEARCH(inputValue))
        .then((t) => t.json())
        .then((searchedValues: SearchResult) => {
          setsearchResults(searchedValues);
        });
    }
  };

  return (
    <>
      <SearchBar className={className} big onButtonClick={(searchText) => globalSearch(searchText)} />
      <RechercheResultats searchResult={searchResults} className={"mt-10"} />
    </>
  );
};
