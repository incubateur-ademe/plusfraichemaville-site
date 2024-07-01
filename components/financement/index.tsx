"use client";
import { AideEstimationsListe } from "./aide/aide-estimations-liste";
import { AideEstimationListeEmpty } from "./aide/aide-estimations-liste-empty";
import { useProjetsStore } from "@/stores/projets/provider";

export const Financement = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const { estimations, fiches_solutions_id: fichesSolutions } = projet || {};

  const hasEstimations = estimations && estimations?.length > 0;
  const hasFichesSolutions = fichesSolutions && fichesSolutions?.length > 0;
  const hasAlreadySelectedAides = !!estimations?.find((estimation) => estimation.estimations_aides.length > 0);
  return (
    <div className="fr-container pt-8">
      {hasFichesSolutions && hasEstimations && !hasAlreadySelectedAides ? (
        <AideEstimationListeEmpty />
      ) : (
        <AideEstimationsListe estimations={estimations || []} />
      )}
    </div>
  );
};
