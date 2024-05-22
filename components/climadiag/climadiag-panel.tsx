"use client";
import { useEffect, useState } from "react";
import { useSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { ClimadiagIndicateurs } from "@/components/climadiag/climadiag-indicateurs";
import { Climadiag } from "./types";

export const ClimadiagPanel = ({ userId }: { userId: string }) => {
  const [value, setValue] = useState<Climadiag>();
  const { data, isLoading } = useSwrWithFetcher<Climadiag[]>(
    `/api/get-climadiag-info-for-user-projects?userId=${userId}`,
  );

  useEffect(() => {
    if (!isLoading) {
      setValue(data?.[0]);
    }
  }, [data, isLoading]);

  return (
    <div className="bg-dsfr-background-open-blue-france">
      <div className="fr-container py-10 min-h-[25rem]">
        <div className="text-dsfr-text-label-blue-france text-[1.375rem] font-bold mb-6">
          Les indicateurs de surchauffe de ma collectivité
        </div>
        {data && data.length > 0 && (
          <>
            <Select
              label=""
              nativeSelectProps={{
                onChange: (event) => setValue(data?.find((climadiagInfo) => climadiagInfo.id === +event.target.value)),
                className: "!bg-white !shadow-none !rounded-md min-w-64 !w-fit",
              }}
            >
              {data.map((climadiagInfo) => (
                <option key={climadiagInfo.id} value={climadiagInfo.id}>
                  {climadiagInfo.nom} - {climadiagInfo.code_postal}
                </option>
              ))}
            </Select>
            {value && <ClimadiagIndicateurs climadiagInfo={value} />}
          </>
        )}
      </div>
    </div>
  );
};
