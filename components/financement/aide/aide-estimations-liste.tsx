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
import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";

import { Case, Conditional } from "@/components/common/conditional-renderer";
import { useUserStore } from "@/stores/user/provider";
import { AideEstimationsCardRecap } from "@/components/financement/aide/aide-estimations-recap";

export const AideEstimationsListe = ({ estimations }: { estimations: EstimationWithAides[] }) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const isCurrentUserAdmin = useProjetsStore((state) => state.isCurrentUserAdmin(currentUserId));
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  return (
    <div>
      <AideEstimationsListeHeader
        title="Pour quelle estimation souhaitez-vous
        trouver des financements ou des soutiens à l'ingénierie ?"
      />
      <div>
        {estimations.map((estimation) => (
          <AideEstimationsCard estimation={estimation} key={estimation.id}>
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
              <Conditional>
                <Case condition={isCurrentUserAdmin}>
                  <AideEstimationsCardWithoutSelection estimation={estimation}>
                    <AideEstimationsListeLink
                      className="fr-btn !ml-auto !block rounded-3xl"
                      projetId={projet?.id}
                      estimationId={estimation.id}
                    >
                      Sélectionner
                    </AideEstimationsListeLink>
                  </AideEstimationsCardWithoutSelection>
                </Case>
                <Case condition={!isCurrentUserAdmin}>
                  <AideEstimationsCardRecap
                    isLoading={false}
                    countAides={{ aideFinanciereCount: 0, aideTechniqueCount: 0, verb: "sélectionné" }}
                  />
                </Case>
              </Conditional>
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
