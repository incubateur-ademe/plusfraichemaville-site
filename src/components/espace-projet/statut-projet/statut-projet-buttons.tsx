"use client";
import { STATUT_PROJET_BUTTONS } from "@/src/components/espace-projet/statut-projet/statut-projet";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { updateProjetStatutAction } from "@/src/actions/projets/update-projet-statut-action";
import Image from "next/image";
import clsx from "clsx";
import { notifications } from "@/src/components/common/notifications";
import { StatutProjet } from "@/src/generated/prisma/client";
import { useState } from "react";

export const StatutProjetButtons = () => {
  const [loading, setLoading] = useState(false);
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  if (!projet) {
    return null;
  }
  const handleStatutChange = async (statut: StatutProjet) => {
    setLoading(true);
    const result = await updateProjetStatutAction(projet.id, statut);
    if (result.projet) {
      addOrUpdateProjet(result.projet);
    }
    notifications(result.type, result.message);
    setLoading(false);
  };

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {STATUT_PROJET_BUTTONS.map((statutProjetButton) => (
        <button
          role="radio"
          onClick={() => {
            handleStatutChange(statutProjetButton.statut);
          }}
          className={clsx(
            "rounded-xl p-6 shadow-pfmv-card-shadow",
            "!border-[1px] border-solid",
            projet.statut === statutProjetButton.statut ? "border-pfmv-navy" : "border-dsfr-border-default-grey",
            loading ? "cursor-progress" : "cursor-pointer",
          )}
          aria-selected={projet.statut === statutProjetButton.statut}
        >
          <div className="text-xl mb-0 flex items-center gap-2 font-bold">
            <Image src={statutProjetButton.icon} alt="" width={40} height={40} />
            {statutProjetButton.label}
          </div>
        </button>
      ))}
    </div>
  );
};
