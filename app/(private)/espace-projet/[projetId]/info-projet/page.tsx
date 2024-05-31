"use client";
import { ProjetInfoForm } from "@/forms/projet/ProjetInfoForm";
import { useProjetsStore } from "@/stores/projets/provider";
import { useShallow } from "zustand/react/shallow";

export default function UpdateProjetPage() {
  const { getCurrentProjet } = useProjetsStore(useShallow((state) => state));
  const currentProjet = getCurrentProjet();

  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h5 !mb-2 !text-dsfr-text-label-blue-france">{"Je renseigne mon projet"}</h1>
      <div className="mb-4">
        {"Toutes les informations me permettront d'obtenir des recommandations sur mon projet."}
      </div>
      <ProjetInfoForm projet={currentProjet} />
    </div>
  );
}
