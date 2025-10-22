"use client";
import { ALL_STATUT_PROJET } from "@/src/components/espace-projet/statut-projet/statut-projet";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { updateProjetStatutAction } from "@/src/actions/projets/update-projet-statut-action";
import Image from "next/image";
import clsx from "clsx";
import { StatutProjet } from "@/src/generated/prisma/client";
import { useState } from "react";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import { notifications, NotificationsType } from "@/src/components/common/notifications";

export const StatutProjetButtons = () => {
  const [loading, setLoading] = useState(false);
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const isLecteur = useIsLecteur();
  if (!projet) {
    return null;
  }
  const handleStatutChange = async (statut: StatutProjet) => {
    setLoading(true);
    const result = await updateProjetStatutAction(projet.id, statut);
    if (result.type === "error") {
      notifications(result.type, result.message);
    }
    if (result.projet) {
      addOrUpdateProjet(result.projet);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {ALL_STATUT_PROJET.map((statutProjetButton) => (
        <button
          key={statutProjetButton.statut}
          disabled={!isLecteur}
          role="radio"
          onClick={() => {
            handleStatutChange(statutProjetButton.statut);
          }}
          className={clsx(
            "rounded-xl p-6 shadow-pfmv-card-strong-shadow",
            "!border-1 border-solid",
            projet.statut === statutProjetButton.statut ? "border-pfmv-navy" : "border-dsfr-border-default-grey",
            loading ? "cursor-progress" : "cursor-pointer",
          )}
          aria-selected={projet.statut === statutProjetButton.statut}
        >
          <div className="mb-0 flex items-center gap-2 text-xl font-bold">
            <Image src={statutProjetButton.buttonIcon} alt="" width={40} height={40} />
            {statutProjetButton.buttonLabel}
          </div>
        </button>
      ))}
    </div>
  );
};
