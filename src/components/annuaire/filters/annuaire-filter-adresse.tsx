import { Fragment, useState, useEffect } from "react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { fetchAddressFromBanApi } from "@/src/lib/adresseApi/fetch";
import { BanFeature } from "@/src/lib/adresseApi/types";
import debounce from "lodash/debounce";
import { Spinner } from "@/src/components/common/spinner";
import clsx from "clsx";
import { LatLngTuple } from "leaflet";
import { ZoomLevelKey } from "../types";

type SourcingFilterAdresseProps = {
  setMapFocus: (_: { coordinates?: LatLngTuple; zoom?: ZoomLevelKey }) => void;
};

export const AnnuaireFilterAdresse = ({ setMapFocus }: SourcingFilterAdresseProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedAddresses, setFetchedAddresses] = useState<BanFeature[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchAddressFromBanApi(query, 10)
      .then((result) => {
        setFetchedAddresses(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  const handleChange = (selectedAddress: BanFeature | null) => {
    if (selectedAddress) {
      setMapFocus({
        coordinates: [selectedAddress.geometry.coordinates[1], selectedAddress.geometry.coordinates[0]] as LatLngTuple,
        zoom: selectedAddress.properties.type,
      });
    }
  };

  const throttledFetchAddress = debounce((keyword) => setQuery(keyword), 200);

  return (
    <Combobox onChange={handleChange} as="div">
      <div className="relative mr-5 flex h-fit w-96">
        <ComboboxInput
          className={clsx(
            "relative h-12 w-96 placeholder:text-black",
            "px-4 ring-1 ring-dsfr-border-default-grey",
            "focus:bg-dsfr-contrast-grey focus:outline-none",
          )}
          placeholder="Rechercher une adresse"
          displayValue={(address: BanFeature) =>
            address ? `${address?.properties.label} - ${address?.properties.postcode}` : ""
          }
          onChange={(event) => throttledFetchAddress(event.target.value)}
        />

        {loading && <Spinner className="absolute right-2 top-3" />}
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-100"
        afterLeave={() => setQuery("")}
      >
        <ComboboxOptions
          className={clsx(
            "absolute top-12 z-[1000] max-h-60 !w-96 list-none overflow-auto",
            "bg-white",
            "ring-1 ring-dsfr-border-default-grey",
          )}
        >
          {fetchedAddresses.length === 0 && query !== "" && !loading ? (
            <div className="border-b border-dsfr-border-default-grey p-4">Aucun résultat.</div>
          ) : (
            fetchedAddresses.map((address, index) => (
              <ComboboxOption
                key={index}
                value={address}
                className={({ focus }) =>
                  clsx(
                    "-ml-4 h-14 border-b border-dsfr-border-default-grey !pl-8",
                    "flex items-center",
                    focus && "bg-dsfr-background-alt-grey",
                  )
                }
              >
                {`${address?.properties.label} - ${address?.properties.postcode}`}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
};
