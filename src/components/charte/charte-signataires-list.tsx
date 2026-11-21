"use client";

import { useMemo } from "react";
import { CharteRegionFilter } from "@/src/components/charte/charte-region-filter";
import { CharteSignataireCard } from "@/src/components/charte/charte-signataire-card";
import { CharteRejoindreSignatairesCta } from "@/src/components/charte/charte-rejoindre-signataires-cta";
import {
  CHARTE_REGION_FILTER_NAME,
  CharteSignataire,
  countSignatairesByRegion,
} from "@/src/components/charte/charte-helpers";
import { useMultipleValuesFilter } from "@/src/hooks/useMultipleValuesFilter";

type CharteSignatairesListProps = {
  signataires: CharteSignataire[];
};

export const CharteSignatairesList = ({ signataires }: CharteSignatairesListProps) => {
  const { selectedFilterCodes } = useMultipleValuesFilter(CHARTE_REGION_FILTER_NAME);

  const regions = useMemo(() => countSignatairesByRegion(signataires), [signataires]);

  const filteredSignataires =
    selectedFilterCodes.length === 0
      ? signataires
      : signataires.filter(({ regionCode }) => regionCode && selectedFilterCodes.includes(regionCode));

  return (
    <>
      <CharteRegionFilter className="mb-8" regions={regions} totalCount={signataires.length} />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSignataires.map((signataire) => (
            <CharteSignataireCard key={signataire.documentId} signataire={signataire} />
          ))}
        </div>
        <CharteRejoindreSignatairesCta className="h-fit shrink-0 lg:w-80" />
      </div>
    </>
  );
};
