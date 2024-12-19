"use client";
import { AideEstimationsListe } from "./aide/aide-estimations-liste";
import { AideEstimationListeEmpty } from "./aide/aide-estimations-liste-empty";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

export const Financement = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);
  const { estimations } = projet || {};

  const hasEstimations = estimations && estimations?.length > 0;
  const hasAlreadySelectedAides = !!estimations?.find((estimation) => estimation.estimations_aides.length > 0);
  return (
    <div className="fr-container pt-8">
      <Conditional>
        <Case condition={!canEditProjet && !hasAlreadySelectedAides}>
          <div className="mb-2 text-2xl font-bold">{"Aucun plan de financement n'a été fait pour ce projet"}</div>
        </Case>
        <Case condition={canEditProjet || hasAlreadySelectedAides}>
          {hasEstimations || hasAlreadySelectedAides ? (
            <AideEstimationsListe estimations={estimations || []} />
          ) : (
            <AideEstimationListeEmpty />
          )}
        </Case>
      </Conditional>
    </div>
  );
};
