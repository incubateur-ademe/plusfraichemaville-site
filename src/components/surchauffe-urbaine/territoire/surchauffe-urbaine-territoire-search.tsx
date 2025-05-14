"use client";
import clsx from "clsx";
import { Climadiag } from "@/src/components/climadiag/types";
import debounce from "lodash/debounce";
import { useState } from "react";
import {
  climadiagToOptions,
  computeSearchResultGroup,
  NO_RESULT_OPTION,
  SearchResultOption,
} from "@/src/components/surchauffe-urbaine/territoire/search-helpers";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES, SEARCH_CLIMADIAG_PUBLIC_INFO } from "@/src/helpers/routes";
import AsyncSelect from "react-select/async";
import isEmpty from "lodash/isEmpty";

export const SurchauffeUrbaineTerritoireSearch = ({
  initialOption,
  className,
}: {
  initialOption?: SearchResultOption | null;
  className?: string;
}) => {
  const [selectedAddress, setSelectedAddress] = useState<SearchResultOption | null | undefined>(initialOption);

  const router = useRouter();

  const submitSearch = () => {
    if (selectedAddress) {
      router.push(PFMV_ROUTES.SURCHAUFFE_URBAINE_TERRITOIRE(selectedAddress.value));
    }
  };

  const searchClimadiagInfos = (inputValue: string, callback: (_: any) => void) => {
    if (inputValue?.trim().length > 2) {
      fetch(SEARCH_CLIMADIAG_PUBLIC_INFO(inputValue))
        .then((t) => t.json())
        .then((searchedValues: Climadiag[]) => {
          const searchOptions = !isEmpty(searchedValues)
            ? computeSearchResultGroup(climadiagToOptions(searchedValues))
            : NO_RESULT_OPTION;
          callback(searchOptions);
        });
    } else {
      callback([]);
    }
  };

  const loadSuggestions = debounce(searchClimadiagInfos, 200);

  return (
    <div className={clsx("pfmv-strong-card px-12 py-10 text-left", className)}>
      <div className="text-center text-[1.375rem] font-bold">
        Découvrez en un coup d’œil comment votre territoire est exposé à la surchauffe urbaine
      </div>
      <div className="mx-auto mt-4 flex max-w-[30rem] flex-row">
        <AsyncSelect
          components={{ DropdownIndicator: null }}
          classNames={{
            control: () =>
              "w-full !rounded-l-lg !rounded-r-none !bg-dsfr-background-alt-grey h-14 !border-none font-bold pl-4",
          }}
          noOptionsMessage={() => null}
          value={selectedAddress}
          loadOptions={loadSuggestions}
          onChange={(event) => setSelectedAddress(event)}
          loadingMessage={() => "Recherche en cours..."}
          className="relative w-[26rem]"
          isClearable
          placeholder="Saisissez votre commune / EPCI (nom ou code)"
          instanceId="climadiag-select-address"
        />
        <div
          className={clsx(
            "w-14 rounded-r-lg px-2",
            selectedAddress ? "cursor-pointer bg-pfmv-navy" : "cursor-not-allowed bg-dsfr-background-disabled-grey",
          )}
          tabIndex={0}
          onClick={submitSearch}
        >
          <i
            className={clsx(
              "ri-search-line fr-icon--lg before:ml-1 before:mt-3",
              selectedAddress ? "text-white" : "text-dsfr-text-disabled-grey",
            )}
            aria-label="Rechercher"
          />
        </div>
      </div>
    </div>
  );
};
