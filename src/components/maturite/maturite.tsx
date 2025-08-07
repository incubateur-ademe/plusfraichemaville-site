"use client";

import {
  ALL_NIVEAU_MATURITE,
  formatNiveauMaturiteOptionLabel,
  formatNiveauMaturiteWithoutLabel,
  getNiveauMaturiteByCode,
  NiveauMaturite,
} from "@/src/helpers/maturite-projet";
import { useMemo } from "react";
import { updateMaturiteProjetAction } from "@/src/actions/projets/update-maturite-projet-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { notifications } from "../common/notifications";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { UPDATE_MATURITE } from "@/src/helpers/matomo/matomo-tags";
import Select from "react-select";
import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import clsx from "clsx";

type MaturiteProps = {
  niveau: string | null;
  projetId: number;
  buttonBgHoverColor?: string;
  withLabel?: boolean;
  editable?: boolean;
};

export const Maturite = ({
  withLabel,
  niveau,
  projetId,
  buttonBgHoverColor = "bg-white",
  editable = true,
}: MaturiteProps) => {
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const readOnly = useIsLecteur(projetId) || !editable;

  const handleUpdateMaturiteProjet = async (niveau: NiveauMaturite["code"]) => {
    if (projetId) {
      const result = await updateMaturiteProjetAction(projetId, niveau);
      trackEvent(UPDATE_MATURITE);
      if (result.projet) {
        addOrUpdateProjet(result.projet);
      }
      notifications(result.type, result.message);
    }
  };

  const currentNiveau = useMemo(() => getNiveauMaturiteByCode(niveau || null), [niveau]);
  return (
    <Tooltip className={clsx(withLabel && "invisible")} kind="hover" title={currentNiveau?.label}>
      <Select
        className="z-50"
        isSearchable={false}
        // isDisabled={readOnly}
        styles={{
          menu: (baseStyles) => ({ ...baseStyles, width: "max-content" }),
        }}
        classNames={{
          indicatorSeparator: (_) => "hidden",
          control: (_) => `!border-t-0 !border-x-0 !cursor-pointer ${buttonBgHoverColor || "!bg-white"}`,
          valueContainer: (_) => "!p-0 !bg-none",
          dropdownIndicator: (_) => `!text-black ${readOnly && "!hidden"}`,
          option: (state) => (state.isSelected ? "!text-white" : "!text-black"),
          menu: (_) => `${readOnly && "!hidden"}`,
        }}
        options={readOnly ? [] : ALL_NIVEAU_MATURITE}
        getOptionValue={(niveau) => niveau.code}
        value={currentNiveau}
        formatOptionLabel={(niveau, { context }) =>
          context === "value" && !withLabel
            ? formatNiveauMaturiteWithoutLabel(niveau)
            : formatNiveauMaturiteOptionLabel(niveau)
        }
        onChange={(niveau) => handleUpdateMaturiteProjet(niveau!.code)}
      />
    </Tooltip>
  );
};
