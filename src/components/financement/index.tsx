"use client";
import { ProjetNoAideOverviewCard } from "./aide/projet-no-aide-overview-card";
import { AideProjetAidesListe } from "./aide/aide-projet-aides-liste";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const Financement = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  const canEditProjet = useCanEditProjet(currentProjet?.id);
  const hasSelectedAides = (currentProjet?.projetAides?.length ?? 0) > 0;
  if (!currentProjet) return null;

  return (
    <div className="fr-container pt-8">
      <Conditional>
        <Case condition={!canEditProjet && !hasSelectedAides}>
          <div className="mb-2 text-2xl font-bold">{"Aucun plan de financement n'a été fait pour ce projet"}</div>
        </Case>
        <Case condition={canEditProjet || hasSelectedAides}>
          <Conditional>
            <Case condition={hasSelectedAides}>
              <AideProjetAidesListe />
            </Case>
            <Case condition={!hasSelectedAides}>
              <ProjetNoAideOverviewCard/>
            </Case>
          </Conditional>
        </Case>
      </Conditional>
    </div>
  );
};
