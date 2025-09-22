"use client";
import { ProjetInfoForm } from "@/src/forms/projet/ProjetInfoForm";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useShallow } from "zustand/react/shallow";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { BREADCRUMB_EDIT_PROJET } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

export default function UpdateProjetPage() {
  const { getCurrentProjet } = useProjetsStore(useShallow((state) => state));
  const currentProjet = getCurrentProjet();
  const canEditProjet = useCanEditProjet(currentProjet?.id);

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_EDIT_PROJET} />
      <div className="fr-container pt-8">
        <h1 className="text-2xl">{"Je renseigne mon projet"}</h1>
        <div className="mb-4">
          {"Toutes les informations me permettront d'obtenir des recommandations sur mon projet."}
        </div>
        <ProjetInfoForm projet={currentProjet} readOnly={!canEditProjet} />
      </div>
    </>
  );
}
