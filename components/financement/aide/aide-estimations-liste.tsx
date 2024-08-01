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
import Image from "next/image";
import { Case, Conditional } from "@/components/common/conditional-renderer";
import { useUserStore } from "@/stores/user/provider";

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
        {estimations.map((estimation, index) => (
          <AideEstimationsCard estimation={estimation} key={index}>
            {estimation.estimations_aides.length > 0 ? (
              <AideEstimationsCardWithSelection estimation={estimation}>
                <Conditional>
                  <Case condition={isCurrentUserAdmin === true}>
                    <AideEstimationsListeLink
                      className="fr-btn !ml-auto mt-6 !block rounded-3xl"
                      projetId={projet?.id}
                      estimationId={estimation.id}
                    >
                      Modifier
                    </AideEstimationsListeLink>
                  </Case>
                  <Case condition={isCurrentUserAdmin === false}>
                    <div className="flex items-center justify-center gap-4">
                      <Image src="/images/espace-projet/viewer-mode.svg" width={46} height={35} alt="" />
                      <strong className="text-pfmv-navy">Mode lecteur</strong>
                    </div>
                  </Case>
                </Conditional>
              </AideEstimationsCardWithSelection>
            ) : (
              <AideEstimationsCardWithoutSelection estimation={estimation}>
                <Conditional>
                  <Case condition={isCurrentUserAdmin === true}>
                    <AideEstimationsListeLink
                      className="fr-btn !ml-auto !block rounded-3xl"
                      projetId={projet?.id}
                      estimationId={estimation.id}
                    >
                      Sélectionner
                    </AideEstimationsListeLink>
                  </Case>
                  <Case condition={isCurrentUserAdmin === false}>
                    <div className="flex items-center justify-center gap-4">
                      <Image src="/images/espace-projet/viewer-mode.svg" width={46} height={35} alt="" />
                      <strong className="text-pfmv-navy">Mode lecteur</strong>
                    </div>
                  </Case>
                </Conditional>
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
