"use client";
import { useEffect, useMemo, useState } from "react";
import { useSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { ClimadiagIndicateurs } from "@/src/components/climadiag/climadiag-indicateurs";
import AsyncSelect from "react-select/async";
import { climadiagToOptions, computeSearchResultGroup, NO_RESULT_OPTION } from "@/src/components/climadiag/helpers";
import debounce from "lodash/debounce";
import { Climadiag, GroupedOptions } from "./types";

export const ClimadiagPanel = ({ userId }: { userId: string }) => {
  const [selectedClimadiagInfo, setSelectedClimadiagInfo] = useState<Climadiag>();
  const [userResultGroup, setUserResultGroup] = useState<GroupedOptions[]>([]);
  const [searchClimadiagData, setSearchClimadiagData] = useState<Climadiag[]>([]);

  const { data: userClimadiagInfos, isLoading } = useSwrWithFetcher<Climadiag[]>(
    `/api/get-climadiag-info-for-user-projects?userId=${userId}`,
  );

  const searchClimadiagInfos = (inputValue: string, callback: (_: any) => void) => {
    if (inputValue?.trim().length > 2) {
      fetch(`/api/search-climadiag-info?search=${inputValue}`)
        .then((t) => t.json())
        .then((searchedValues: Climadiag[]) => {
          setSearchClimadiagData(searchedValues);
          const searchOptions = searchedValues?.length > 0 ? climadiagToOptions(searchedValues) : NO_RESULT_OPTION;
          callback(computeSearchResultGroup(searchOptions).concat(userResultGroup));
        });
    } else {
      callback(defaultOptions);
    }
  };

  const loadSuggestions = debounce(searchClimadiagInfos, 200);

  useEffect(() => {
    if (!isLoading && userClimadiagInfos && userClimadiagInfos.length > 0) {
      setSelectedClimadiagInfo(userClimadiagInfos[0]);
      setUserResultGroup([{ label: "Vos collectivités", options: climadiagToOptions(userClimadiagInfos) }]);
    }
  }, [userClimadiagInfos, isLoading]);

  const selectableData = useMemo(
    () => userClimadiagInfos?.concat(searchClimadiagData),
    [userClimadiagInfos, searchClimadiagData],
  );

  const defaultOptions = useMemo(() => {
    if (
      !selectedClimadiagInfo ||
      userClimadiagInfos?.find((climadiag) => climadiag?.id === selectedClimadiagInfo?.id)
    ) {
      return userResultGroup;
    } else {
      return computeSearchResultGroup(climadiagToOptions([selectedClimadiagInfo])).concat(userResultGroup);
    }
  }, [userClimadiagInfos, selectedClimadiagInfo, userResultGroup]);

  return (
    <div className="bg-dsfr-background-open-blue-france pb-20" id="climadiag-panel">
      <div className="fr-container min-h-[25rem] pb-28 pt-10">
        <h2 className="mb-6 text-[1.375rem] font-bold leading-tight text-dsfr-text-label-blue-france">
          Les indicateurs de surchauffe de ma collectivité
        </h2>
        <>
          <AsyncSelect
            value={selectedClimadiagInfo ? climadiagToOptions([selectedClimadiagInfo]) : null}
            defaultOptions={defaultOptions}
            loadOptions={loadSuggestions}
            onChange={(event) =>
              setSelectedClimadiagInfo(
                selectableData?.find((climadiagInfo) => climadiagInfo.id === +(event?.value || 0)),
              )
            }
            loadingMessage={() => "Recherche en cours..."}
            className="w-fit min-w-64"
            isClearable
            placeholder="Chercher une commune / EPCI (nom ou code)"
          />
          {selectedClimadiagInfo && <ClimadiagIndicateurs climadiagInfo={selectedClimadiagInfo} />}
        </>
      </div>
    </div>
  );
};
