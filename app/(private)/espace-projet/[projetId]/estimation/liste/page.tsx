"use client";
import { useProjetsStore } from "@/stores/projets/provider";
import React from "react";
import { PFMV_ROUTES } from "@/helpers/routes";
import { redirect } from "next/navigation";
import { EstimationOverviewCard } from "@/components/estimation/estimation-overview-card";
import Button from "@codegouvfr/react-dsfr/Button";
import { GenericFicheLink } from "@/components/common/generic-save-fiche/generic-fiche-link";
import { useUserStore } from "@/stores/user/provider";

export default function CreateEstimationPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const isCurrentUserAdmin = useProjetsStore((state) => state.isCurrentUserAdmin(currentUserId));

  if (!currentProjet) {
    return null;
  }
  if (currentProjet.estimations.length < 1 && isCurrentUserAdmin) {
    redirect(PFMV_ROUTES.ESPACE_PROJET_CREATION_ESTIMATION(currentProjet.id));
  } else {
    return (
      <div className="fr-container pt-8">
        <div className="mb-2 text-2xl font-bold">{"Je fais une estimation de budget pour mon projet"}</div>
        <div className="text-lg">{`Mes solutions sélectionnées pour mon projet ${currentProjet?.nom}.`}</div>
        <div className="mb-10  text-lg">
          {`Vous pouvez estimer une fourchette de prix en fonction des matériaux et systèmes choisis.`}
        </div>
        <div className="flex flex-col gap-12">
          {currentProjet.estimations.map((estimation) => (
            <EstimationOverviewCard
              key={estimation.id}
              estimation={estimation}
              isCurrentUserAdmin={isCurrentUserAdmin}
            />
          ))}
        </div>
        <div className="mt-12 flex flex-row gap-6">
          {isCurrentUserAdmin && (
            <Button
              className="rounded-3xl"
              iconId="ri-add-circle-fill"
              iconPosition="left"
              linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET_CREATION_ESTIMATION(currentProjet.id), target: "_self" }}
            >
              Ajouter une estimation
            </Button>
          )}
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
            className="fr-btn fr-btn--secondary rounded-3xl"
          >
            Revenir au tableau de bord
          </GenericFicheLink>
        </div>
      </div>
    );
  }
}
