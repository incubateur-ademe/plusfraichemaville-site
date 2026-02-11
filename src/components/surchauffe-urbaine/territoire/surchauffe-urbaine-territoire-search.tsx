"use client";
import clsx from "clsx";
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
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { SURCHAUFFE_URBAINE_TERRITOIRE_SEARCH } from "@/src/helpers/matomo/matomo-tags";
import Button from "@codegouvfr/react-dsfr/Button";
import { ClimadiagDto } from "@/src/types/dto";

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
      trackEvent(SURCHAUFFE_URBAINE_TERRITOIRE_SEARCH(selectedAddress.value));
      router.push(PFMV_ROUTES.SURCHAUFFE_URBAINE_TERRITOIRE_AVEC_CODE(selectedAddress.value));
    }
  };

  const searchClimadiagInfos = (inputValue: string, callback: (_: any) => void) => {
    if (inputValue?.trim().length > 2) {
      fetch(SEARCH_CLIMADIAG_PUBLIC_INFO(inputValue))
        .then((t) => t.json())
        .then((searchedValues: ClimadiagDto[]) => {
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
    <section className={clsx("pfmv-card-no-hover px-12 py-10 text-left", className)}>
      <h1 className="text-center text-[1.375rem] font-bold">
        Connaître la sensibilité actuelle et future de ma ville à la surchauffe urbaine
      </h1>
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
        <Button
          disabled={!selectedAddress}
          className={clsx("w-14 rounded-r-lg px-2", selectedAddress ? "" : "!bg-dsfr-background-disabled-grey")}
          onClick={submitSearch}
        >
          <i
            className={clsx(
              "ri-search-line fr-icon--lg",
              selectedAddress ? "text-white" : "text-dsfr-text-disabled-grey",
            )}
            aria-label="Rechercher"
          />
        </Button>
      </div>
    </section>
  );
};
