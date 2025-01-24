import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { AnnuaireFiltersAccordion } from "./annuaire-filters-accordion";
import { CustomMarkerType } from "../types";

type AnnuaireFilterProjetStatusProps = {
  selectedProjetStatus: CustomMarkerType[];
  setSelectedProjetStatus: (_status: CustomMarkerType[]) => void;
};

export const AnnuaireFilterProjetStatus = ({
  selectedProjetStatus,
  setSelectedProjetStatus,
}: AnnuaireFilterProjetStatusProps) => {
  const handleSelectedProjetStatus = (projetStatus: CustomMarkerType) => {
    setSelectedProjetStatus(
      selectedProjetStatus?.includes(projetStatus)
        ? selectedProjetStatus?.filter((t) => t !== projetStatus)
        : [...selectedProjetStatus, projetStatus],
    );
  };
  return (
    <AnnuaireFiltersAccordion code="statut-projet">
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
    </AnnuaireFiltersAccordion>
  );
};
