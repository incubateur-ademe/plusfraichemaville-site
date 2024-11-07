"use client";

import { updateProjetVisibilityAction } from "@/src/actions/projets/update-projet-visibility-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import ToggleSwitch from "@codegouvfr/react-dsfr/ToggleSwitch";
import { notifications } from "../common/notifications";
import Image from "next/image";
import clsx from "clsx";

export const SourcingVisibility = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isPublic = useProjetsStore((state) => state.getCurrentProjet())?.is_public;
  const projetId = useProjetsStore((state) => state.getCurrentProjet())?.id;
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);

  const handleVisibility = async (checked: boolean) => {
    if (projetId) {
      const result = await updateProjetVisibilityAction(projetId, checked);
      if (result.projet) {
        addOrUpdateProjet(result.projet);
      }
      notifications(result.type, result.message);
    }
  };

  return (
    <div className="rounded-[20px] bg-dsfr-background-default-grey-hover px-8 py-6">
      {currentProjet ? (
        <p className={clsx("fr-badge fr-badge--sm fr-badge--no-icon mb-2", isPublic && "fr-badge--success")}>
          <Image src="/images/sourcing/sourcing-france-visible.svg" className="mr-1" width={11} height={11} alt="" />
          {isPublic ? "Visible" : "Masqué"} {"sur l'annuaire des projets"}
        </p>
      ) : (
        <div className="mb-2 h-[1.3575rem] w-[265px] animate-pulse rounded bg-dsfr-contrast-grey"></div>
      )}

      <div className="flex items-center justify-between">
        <div className="max-w-4xl">
          <p className="mb-3 text-xl font-bold">
            Souhaitez-vous faire apparaître ce projet sur l’annuaire Plus fraîche ma ville ?{" "}
          </p>
          <p>
            Dans le cadre du module 6 de l’espace projet Plus fraîche ma ville, vous pouvez retrouvez des projets
            réalisés et en cours pour créer un réseau de collectivités. Votre projet, en cours, peut y figurer
          </p>
        </div>
        {currentProjet ? (
          <div>
            <ToggleSwitch
              labelPosition="right"
              label=""
              inputTitle=""
              showCheckedHint={false}
              defaultChecked={isPublic}
              onChange={handleVisibility}
            />
          </div>
        ) : (
          <div className="h-6 w-[72px] rounded-full">
            <div className="h-6 w-10 rounded-full bg-dsfr-contrast-grey"></div>
          </div>
        )}
      </div>
    </div>
  );
};
