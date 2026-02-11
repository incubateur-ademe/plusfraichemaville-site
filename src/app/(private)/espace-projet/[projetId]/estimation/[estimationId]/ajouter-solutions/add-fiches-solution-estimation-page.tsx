"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useParams } from "next/navigation";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_MES_ESTIMATIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-estimation";
import { useMemo } from "react";
import { AddSolutionsToEstimationForm } from "@/src/forms/estimation/add-solutions-to-estimation-form";

export default function AddFichesSolutionEstimationPage() {
  const params = useParams();
  const estimationId = Number(params.estimationId);

  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  const estimation = useMemo(() => {
    if (currentProjet && estimationId) {
      return currentProjet.estimations.find((e) => e.id === estimationId);
    }
  }, [currentProjet, estimationId]);

  const projetFichesSolutionsIds =
    getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution }) ?? [];

  const fichesSolutionsIdsNotInEstimation = useMemo(() => {
    if (!estimation) return [];
    const estimationFicheSolutionIds = estimation.estimations_fiches_solutions.map((efs) => efs.fiche_solution_id);
    return projetFichesSolutionsIds.filter((id) => !estimationFicheSolutionIds.includes(id));
  }, [estimation, projetFichesSolutionsIds]);

  if (!currentProjet || !estimation) {
    return null;
  }

  return (
    <ProtectedEspaceProjetUrl>
      <BannerProjetBreadcrumb step={BREADCRUMB_MES_ESTIMATIONS} />
      <div className="fr-container pt-8">
        <h1 className="mb-2 text-2xl font-bold">Ajouter des solutions à l'estimation</h1>
        <AddSolutionsToEstimationForm
          estimation={estimation}
          currentProjet={currentProjet}
          fichesSolutionsIdsNotInEstimation={fichesSolutionsIdsNotInEstimation}
        />
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
