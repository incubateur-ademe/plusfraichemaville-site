"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { AideEstimationsCard } from "./aide-estimations-card";
import { AideEstimationsCardWithoutSelection } from "./aide-estimations-card-without-selection";
import { AideEstimationsCardWithSelection } from "./aide-estimations-card-with-selection";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideEstimationsListeLink } from "./aide-estimation-liste-link";
import { PFMV_ROUTES } from "@/helpers/routes";
import React from "react";
import { GenericFicheLink } from "@/components/common/generic-save-fiche/generic-fiche-link";

export const AideEstimationsListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const { estimations, fiches_solutions_id: fichesSolutions } = projet || {};

  const hasEstimations = estimations && estimations?.length > 0;
  const hasFichesSolutions = fichesSolutions && fichesSolutions?.length > 0;

  if (!hasEstimations || !hasFichesSolutions) {
    return null;
  }

  return (
    <div>
      <AideEstimationsListeHeader
        title="Pour quelle estimation souhaitez-vous
        trouver des financements ou des soutiens à l'ingénierie ?"
      />
      <div>
        {estimations.map((estimation, index) => (
          <AideEstimationsCard estimation={estimation} key={index}>
            {estimation.estimations_aides.length > 0 ? (
              <AideEstimationsCardWithSelection estimation={estimation}>
                <AideEstimationsListeLink
                  className="fr-btn !ml-auto mt-6 !block rounded-3xl"
                  projetId={projet?.id}
                  estimationId={estimation.id}
                >
                  Modifier
                </AideEstimationsListeLink>
              </AideEstimationsCardWithSelection>
            ) : (
              <AideEstimationsCardWithoutSelection estimation={estimation}>
                <AideEstimationsListeLink
                  className="fr-btn !ml-auto !block rounded-3xl"
                  projetId={projet?.id}
                  estimationId={estimation.id}
                >
                  Sélectionner
                </AideEstimationsListeLink>
              </AideEstimationsCardWithoutSelection>
            )}
          </AideEstimationsCard>
        ))}
      </div>
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
    </div>
  );
};
