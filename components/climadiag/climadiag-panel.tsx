"use client";
import { useEffect, useMemo, useState } from "react";
import { useSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { climadiag } from "@prisma/client";
import { ClimadiagIndicateurs } from "@/components/climadiag/climadiag-indicateurs";
import AsyncSelect from "react-select/async";
import { climadiagToOptions, computeSearchResultGroup, NO_RESULT_OPTION } from "@/components/climadiag/helpers";

export const ClimadiagPanel = ({ userId }: { userId: string }) => {
  const [selectedClimadiagInfo, setSelectedClimadiagInfo] = useState<climadiag>();
  const [userResultGroup, setUserResultGroup] = useState<any[]>([]);
  const [searchClimadiagData, setSearchClimadiagData] = useState<climadiag[]>([]);

  const { data, isLoading } = useSwrWithFetcher<climadiag[]>(
    `/api/get-climadiag-info-for-user-projects?userId=${userId}`,
  );

  const promiseOptions = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      if (inputValue?.trim().length > 2) {
        resolve(
          fetch(`/api/search-climadiag-info?search=${inputValue}`)
            .then((t) => t.json())
            .then((searchedValues) => {
              setSearchClimadiagData(searchedValues);
              const searchOptions = searchedValues?.length > 0 ? climadiagToOptions(searchedValues) : NO_RESULT_OPTION;
              return computeSearchResultGroup(searchOptions).concat(userResultGroup);
            }),
        );
      } else {
        resolve(defaultOptions);
      }
    });

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      setSelectedClimadiagInfo(data[0]);
      setUserResultGroup([{ label: "Vos collectivités", options: climadiagToOptions(data) }]);
    }
  }, [data, isLoading]);

  const selectableData = useMemo(() => data?.concat(searchClimadiagData), [data, searchClimadiagData]);

  const defaultOptions = useMemo(() => {
    if (data?.find((climadiag) => climadiag?.id === selectedClimadiagInfo?.id) || !selectedClimadiagInfo) {
      return userResultGroup;
    } else {
      return computeSearchResultGroup(climadiagToOptions([selectedClimadiagInfo])).concat(userResultGroup);
    }
  }, [data, selectedClimadiagInfo, userResultGroup]);

  return (
    <div className="bg-dsfr-background-open-blue-france">
      <div className="fr-container py-10 min-h-[25rem]">
        <div className="text-dsfr-text-label-blue-france text-[1.375rem] font-bold mb-6">
          Les indicateurs de surchauffe de ma collectivité
        </div>
        <>
          <AsyncSelect
            value={selectedClimadiagInfo ? climadiagToOptions([selectedClimadiagInfo]) : null}
            defaultOptions={defaultOptions}
            loadOptions={promiseOptions}
            onChange={(event) =>
              setSelectedClimadiagInfo(
                selectableData?.find((climadiagInfo) => climadiagInfo.id === +(event?.value || 0)),
              )
            }
            className="min-w-64 w-fit"
            isClearable
            placeholder="Chercher une commune / EPCI (nom ou code)"
          />
          {selectedClimadiagInfo && <ClimadiagIndicateurs climadiagInfo={selectedClimadiagInfo} />}
        </>
      </div>
    </div>
  );
};
