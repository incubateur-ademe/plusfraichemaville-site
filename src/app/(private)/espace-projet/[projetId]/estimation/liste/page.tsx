"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { redirect } from "next/navigation";
import { EstimationOverviewCard } from "@/src/components/estimation/estimation-overview-card";
import Button from "@codegouvfr/react-dsfr/Button";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import React, { useEffect, useState } from "react";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
// eslint-disable-next-line max-len
import { BREADCRUMB_MES_ESTIMATIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-estimation";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

export default function ListeEstimationPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(currentProjet?.id);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (shouldRedirect && currentProjet) {
      redirect(PFMV_ROUTES.ESPACE_PROJET_CREATION_ESTIMATION(currentProjet.id));
    }
  }, [currentProjet, shouldRedirect]);

  if (!currentProjet) return null;
  if (!currentProjet.estimations.length) {
    if (canEditProjet) {
      !shouldRedirect && setShouldRedirect(true);
      return null;
    }
    return (
      <>
        <BannerProjetBreadcrumb step={BREADCRUMB_MES_ESTIMATIONS} />
        <div className="fr-container pt-8">
          <div className="mb-2 text-2xl font-bold">Aucune estimation {"n'a"} été faite pour ce projet</div>
        </div>
      </>
    );
  }

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_MES_ESTIMATIONS} />
      <div className="fr-container pt-8">
        <div className="mb-10">
          <div className="mb-2 text-2xl font-bold">Je fais une estimation de budget pour mon projet</div>
          <div className="text-lg">Mes solutions sélectionnées pour mon projet {currentProjet.nom}.</div>
          <div className="text-lg">
            Vous pouvez estimer une fourchette de prix en fonction des matériaux et systèmes choisis.
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {currentProjet.estimations.map((estimation) => (
            <EstimationOverviewCard key={estimation.id} estimation={estimation} canEditEstimation={canEditProjet} />
          ))}
        </div>

        <div className="mt-12 flex flex-row gap-6">
          {canEditProjet && (
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
    </>
  );
}
