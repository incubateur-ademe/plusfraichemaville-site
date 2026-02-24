"use client";
import { AideEstimationListeEmpty } from "./aide/aide-projet-liste-empty";
import { AideProjetFichesSolutions } from "./aide/aide-projet-fiches-solutions";
import { AideProjetAidesListe } from "./aide/aide-projet-aides-liste";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const Financement = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);

  const hasSelectedAides = (projet?.projetAides?.length ?? 0) > 0;
  const ficheSolutionIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution }) ?? [];
  const hasFichesSolutions = ficheSolutionIds.length > 0;

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
            <Case condition={!hasSelectedAides && hasFichesSolutions}>
              <AideProjetFichesSolutions projetId={projet?.id ?? 0} ficheSolutionIds={ficheSolutionIds} />
            </Case>
            <Case condition={!hasSelectedAides && !hasFichesSolutions}>
              <AideEstimationListeEmpty />
            </Case>
          </Conditional>
        </Case>
      </Conditional>
    </div>
  );
};
