import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { SourcingFiltersAccordion } from "./sourcing-filters-accordion";
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
    <SourcingFiltersAccordion code="statut-projet">
      <Checkbox
        className="h-12"
        options={[
          {
            label: "En cours",
            nativeInputProps: {
              name: "in-progress",
              value: "in-progress",
              onChange: () => handleSelectedProjetStatus("in-progress"),
              checked: selectedProjetStatus?.includes("in-progress"),
            },
          },
          {
            label: "Terminé",
            nativeInputProps: {
              name: "rex",
              value: "rex",
              onChange: () => handleSelectedProjetStatus("rex"),
              checked: selectedProjetStatus?.includes("rex"),
            },
          },
        ]}
      />
    </SourcingFiltersAccordion>
  );
};
