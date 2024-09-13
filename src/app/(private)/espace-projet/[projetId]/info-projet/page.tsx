"use client";
import { currentUserIsAdmin } from "@/src/components/partage/helpers";
import { ProjetInfoForm } from "@/src/forms/projet/ProjetInfoForm";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { useShallow } from "zustand/react/shallow";

export default function UpdateProjetPage() {
  const { getCurrentProjet } = useProjetsStore(useShallow((state) => state));
  const currentProjet = getCurrentProjet();
  const userId = useUserStore((state) => state.userInfos?.id);
  const isAdmin = currentUserIsAdmin(currentProjet?.users, userId);

  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h5 !mb-2 !text-dsfr-text-label-blue-france">{"Je renseigne mon projet"}</h1>
      <div className="mb-4">
        {"Toutes les informations me permettront d'obtenir des recommandations sur mon projet."}
      </div>
      <ProjetInfoForm projet={currentProjet} readOnly={!isAdmin} />
    </div>
  );
}
