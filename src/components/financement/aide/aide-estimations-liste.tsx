"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { AideEstimationsCard } from "./aide-estimations-card";
import { AideEstimationsCardWithoutSelection } from "./aide-estimations-card-without-selection";
import { AideEstimationsCardWithSelection } from "./aide-estimations-card-with-selection";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideEstimationsListeLink } from "./aide-estimation-liste-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";

import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";

import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { AideEstimationsCardRecap } from "@/src/components/financement/aide/aide-estimations-recap";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

export const AideEstimationsListe = ({ estimations }: { estimations: EstimationWithAides[] }) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);

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
                <Case condition={canEditProjet}>
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
                <Case condition={!canEditProjet}>
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
