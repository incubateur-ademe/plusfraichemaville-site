"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";
import { StatutProjet } from "@/src/generated/prisma/client";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { StatutActionRdv } from "@/src/components/espace-projet/statut-common/statut-action-rdv";
import { StatutActionContact } from "@/src/components/espace-projet/statut-common/statut-action-contact";
import { StatutActionProjetQuestionnaireSatisfaction } from "@/src/components/espace-projet/statut-projet/statut-action-projet-questionnaire-satisfaction";
import { StatutActionProjetAnnuaire } from "@/src/components/espace-projet/statut-projet/statut-action-projet-annuaire";

export const StatutProjetActions = ({ className }: { className?: string }) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  if (!projet) {
    return null;
  }
  return (
    <div className={clsx("flex flex-row flex-wrap gap-6", className)}>
      <Conditional>
        <Case condition={projet.statut === StatutProjet.termine}>
          <StatutActionProjetQuestionnaireSatisfaction />
        </Case>
        <Case condition={projet.statut === StatutProjet.en_cours}>
          <StatutActionProjetAnnuaire />
        </Case>
        <Case condition={projet.statut === StatutProjet.besoin_aide}>
          <StatutActionRdv />
        </Case>
        <Case condition={projet.statut === StatutProjet.autre}>
          <StatutActionContact />
        </Case>
      </Conditional>
    </div>
  );
};
