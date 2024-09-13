"use client";
import { AideEstimationsListe } from "./aide/aide-estimations-liste";
import { AideEstimationListeEmpty } from "./aide/aide-estimations-liste-empty";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";

export const Financement = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const isCurrentUserAdmin = useProjetsStore((state) => state.isCurrentUserAdmin(currentUserId));
  const { estimations } = projet || {};

  const hasEstimations = estimations && estimations?.length > 0;
  const hasAlreadySelectedAides = !!estimations?.find((estimation) => estimation.estimations_aides.length > 0);
  return (
    <div className="fr-container pt-8">
      <Conditional>
        <Case condition={!isCurrentUserAdmin && !hasAlreadySelectedAides}>
          <div className="mb-2 text-2xl font-bold">{"Aucun plan de financement n'a été fait pour ce projet"}</div>
        </Case>
        <Case condition={isCurrentUserAdmin || hasAlreadySelectedAides}>
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
