"use client";
import clsx from "clsx";
import { StatutUser } from "@/src/generated/prisma/client";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { StatutActionRdv } from "@/src/components/espace-projet/statut-common/statut-action-rdv";
import { StatutActionContact } from "@/src/components/espace-projet/statut-common/statut-action-contact";
import { useUserStore } from "@/src/stores/user/provider";
import { StatutActionUserQuestionnaireSatisfaction } from "@/src/components/espace-projet/statut-user/statut-action-user-questionnaire-satisfaction";
import { StatutActionUserAnnuaire } from "@/src/components/espace-projet/statut-user/statut-action-user-annuaire";

export const StatutUserActions = ({ className }: { className?: string }) => {
  const userInfos = useUserStore((state) => state.userInfos);
  if (!userInfos) {
    return null;
  }
  return (
    <div className={clsx("flex flex-row flex-wrap gap-6", className)}>
      <Conditional>
        <Case condition={userInfos.statut === StatutUser.pas_trouve}>
          <StatutActionRdv />
          <StatutActionContact />
        </Case>
        <Case condition={userInfos.statut === StatutUser.pas_maintenant}>
          <StatutActionUserAnnuaire />
        </Case>
        <Case condition={userInfos.statut === StatutUser.pas_compris}>
          <StatutActionRdv />
        </Case>
        <Case condition={userInfos.statut === StatutUser.sans_pfmv}>
          <StatutActionUserQuestionnaireSatisfaction />
        </Case>
        <Case condition={userInfos.statut === StatutUser.autre}>
          <StatutActionContact />
        </Case>
      </Conditional>
    </div>
  );
};
