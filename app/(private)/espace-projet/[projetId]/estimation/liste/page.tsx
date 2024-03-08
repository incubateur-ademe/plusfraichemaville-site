"use client";
import { useProjetsStore } from "@/stores/projets/provider";
import React from "react";
import { PFMV_ROUTES } from "@/helpers/routes";
import { redirect } from "next/navigation";
import { EstimationOverviewCard } from "@/components/estimation/estimation-overview-card";
import Button from "@codegouvfr/react-dsfr/Button";
import { EstimationMateriauModal } from "@/components/estimation/estimation-materiau-modal";

export default function CreateEstimationPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  if (!currentProjet) {
    return null;
  }
  if (currentProjet.estimations.length < 1) {
    redirect(PFMV_ROUTES.ESPACE_PROJET_CREATION_ESTIMATION(currentProjet.id));
  }

  return (
    <div className="fr-container pt-8">
      <div className="text-2xl font-bold mb-2">{"Je fais une estimation de budget pour mon projet"}</div>
      <div className="text-lg">{`Mes solutions sélectionnées pour mon projet ${currentProjet?.nom}.`}</div>
      <div className="mb-10  text-lg">
        {`Vous pouvez estimer une fourchette de prix en fonction des matériaux et système choisis.`}
      </div>
      <div className="flex flex-col gap-12">
        {currentProjet.estimations.map((estimation) => (
          <EstimationOverviewCard key={estimation.id} estimation={estimation} projetId={currentProjet.id} />
        ))}
      </div>
      <div className="flex flex-row gap-6 mt-12">
        <Button
          className="rounded-3xl"
          iconId="ri-add-circle-fill"
          iconPosition="left"
          linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET_CREATION_ESTIMATION(currentProjet.id), target: "_self" }}
        >
          Ajouter une estimation
        </Button>
        <Button
          className="rounded-3xl"
          priority="secondary"
          linkProps={{ href: PFMV_ROUTES.TABLEAU_DE_BORD(currentProjet.id), target: "_self" }}
        >
          Revenir au tableau de bord
        </Button>
      </div>
    </div>
  );
}
