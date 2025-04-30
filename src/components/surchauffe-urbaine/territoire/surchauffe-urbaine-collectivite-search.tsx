"use client";
import clsx from "clsx";
import { Climadiag } from "@/src/components/climadiag/types";
import debounce from "lodash/debounce";
import { Fragment, useEffect, useState } from "react";
import {
  CollectiviteOption,
  searchedCollectiviteToOptions,
} from "@/src/components/surchauffe-urbaine/territoire/search-helpers";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { Spinner } from "@/src/components/common/spinner";

export const SurchauffeUrbaineCollectiviteSearch = ({ className }: { className?: string }) => {
  const [selectedAddress, setSelectedAddress] = useState<CollectiviteOption>();
  const [fetchedAddresses, setFetchedAddresses] = useState<CollectiviteOption[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (query?.trim().length > 2) {
      fetch(`/api/search-climadiag-info?search=${query}&limit=20`)
        .then((t) => t.json())
        .then((searchedValues: Climadiag[]) => {
          console.log("toto", searchedValues);
          setFetchedAddresses(searchedCollectiviteToOptions(searchedValues));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      return setFetchedAddresses([]);
    }
  }, [query]);

  const throttledFetchCollectivite = debounce((keyword) => setQuery(keyword), 200);

  return (
    <div className={clsx("pfmv-strong-card px-12 py-10 text-left", className)}>
      <div className="text-center text-[1.375rem] font-bold">
        Découvrez en un coup d’œil comment votre territoire est exposé à la surchauffe urbaine
      </div>

      <Combobox as="div" className="relative mx-auto mt-4 max-w-[27rem]" onChange={setSelectedAddress}>
        <div className="flex">
          <ComboboxInput
            className="h-14 w-full rounded-l-lg bg-dsfr-background-alt-grey px-6 "
            displayValue={(address: CollectiviteOption) => (address ? `${address?.label}` : "")}
            onChange={(event) => throttledFetchCollectivite(event.target.value)}
            placeholder="Saisissez votre commune / EPCI (nom ou code)"
          />
          {loading && <Spinner />}
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions
            className="shadow-lg absolute z-30 mt-1 max-h-60 w-full list-none overflow-auto
                rounded-md bg-white p-0 text-base ring-1 ring-black/5"
          >
            {fetchedAddresses.length === 0 && query !== "" && !loading ? (
              <div className="relative cursor-default select-none px-4 py-2">Aucune donnée pour cette collectivité</div>
            ) : (
              fetchedAddresses.map((address) => (
                <ComboboxOption
                  key={address.value}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${focus ? "bg-dsfr-background-alt-grey " : ""}`
                  }
                  value={address}
                >
                  {({ selected, focus }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {address.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            focus ? "bg-dsfr-background-alt-grey " : ""
                          }`}
                        />
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
};
