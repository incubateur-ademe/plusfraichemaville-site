"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { AideEstimationsCard } from "./aide-estimations-card";
import { AideEstimationsCardWithoutSelection } from "./aide-estimations-card-without-selection";
import { AideEstimationsCardWithSelection } from "./aide-estimations-card-with-selection";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";

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
      <AideEstimationsListeHeader projetId={projet?.id} />
      <div>
        {estimations.map((estimation, index) => (
          <AideEstimationsCard estimation={estimation} key={index}>
            {estimation.estimations_aides.length > 0 ? (
              <AideEstimationsCardWithSelection
                fichesSolutionsId={estimation.fiches_solutions_id}
                estimationsAides={estimation.estimations_aides}
              />
            ) : (
              <AideEstimationsCardWithoutSelection financementCount={1} ingenierieCount={1} estimation={estimation} />
            )}
          </AideEstimationsCard>
        ))}
      </div>
    </div>
  );
};
