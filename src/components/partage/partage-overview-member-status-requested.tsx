"use client";

import { UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import Button from "@codegouvfr/react-dsfr/Button";
import { useTransition } from "react";
import { Spinner } from "../common/spinner";
import { notifications } from "../common/notifications";
import { acceptProjectRequestAction } from "@/src/actions/userProjet/accept-project-request-action";
import { declineProjectRequestAction } from "@/src/actions/userProjet/decline-project-request-action";
import { useProjetsStore } from "@/src/stores/projets/provider";

export const PartageOverviewMemberStatusRequested = ({ member }: { member: UserProjetWithUser }) => {
  const [isPending, startTransition] = useTransition();
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const userIdToUpdate = member.user_id;
  const projetId = member.projet_id;

  const handleAcceptRequest = () => {
    startTransition(async () => {
      if (userIdToUpdate) {
        const result = await acceptProjectRequestAction(projetId, userIdToUpdate);
        notifications(result.type, result.message);
        if (result.type === "success" && result.updatedProjet) {
          addOrUpdateProjet(result.updatedProjet);
        }
      }
    });
  };
  const handleDeclineRequest = () => {
    startTransition(async () => {
      if (userIdToUpdate) {
        const result = await declineProjectRequestAction(projetId, userIdToUpdate);
        notifications(result.type, result.message);
        if (result.type === "success" && result.updatedProjet) {
          addOrUpdateProjet(result.updatedProjet);
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        priority="tertiary no outline"
        onClick={handleDeclineRequest}
        disabled={isPending}
        className="rounded-[20px]"
      >
        {isPending ? <Spinner /> : "Refuser"}
      </Button>
      <Button priority="tertiary" onClick={handleAcceptRequest} disabled={isPending} className="rounded-[20px]">
        {isPending ? <Spinner /> : "Accepter"}
      </Button>
    </div>
  );
};
