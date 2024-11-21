"use client";

import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { SourcingFiltersAccordion } from "./filters-accordion";
import { CustomMarkerType } from "../types";

type SourcingFilterProjetStatusProps = {
  selectedProjetStatus: CustomMarkerType[];
  setSelectedProjetStatus: (_status: CustomMarkerType[]) => void;
};

export const SourcingFilterProjetStatus = ({
  selectedProjetStatus,
  setSelectedProjetStatus,
}: SourcingFilterProjetStatusProps) => {
  const handleSelectedProjetStatus = (projetStatus: CustomMarkerType) => {
    setSelectedProjetStatus(
      selectedProjetStatus?.includes(projetStatus)
        ? selectedProjetStatus?.filter((t) => t !== projetStatus)
        : [...selectedProjetStatus, projetStatus],
    );
  };
  return (
    <SourcingFiltersAccordion label="Statut du projet">
      <Checkbox
        className="h-12"
        options={[
          {
            label: "En cours",
            nativeInputProps: {
              name: "in-progress",
              value: "in-progress",
              onChange: () => handleSelectedProjetStatus("in-progress"),
            },
          },
          {
            label: "Terminé",
            nativeInputProps: {
              name: "rex",
              value: "rex",
              onChange: () => handleSelectedProjetStatus("rex"),
            },
          },
        ]}
      />
    </SourcingFiltersAccordion>
  );
};
