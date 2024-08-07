"use client";

import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import Button from "@codegouvfr/react-dsfr/Button";
import { useTransition } from "react";
import { Spinner } from "../common/spinner";
import { notifications } from "../common/notifications";
import { acceptProjectRequestAction } from "@/actions/users/accept-project-request-action";
import { declineProjectRequestAction } from "@/actions/users/decline-project-request-action";

export const PartageOverviewMemberStatusRequested = ({ member }: { member: UserProjetWithUser }) => {
  const [isPending, startTransition] = useTransition();
  const userIdToUpdate = member.user_id;
  const projetId = member.projet_id;

  const handleAcceptRequest = () => {
    startTransition(async () => {
      try {
        if (userIdToUpdate) {
          const result = await acceptProjectRequestAction(projetId, userIdToUpdate);
          notifications(result.type, result.message);
        }
      } catch (e) {
        throw new Error();
      }
    });
  };
  const handleDeclineRequest = () => {
    startTransition(async () => {
      try {
        if (userIdToUpdate) {
          const result = await declineProjectRequestAction(projetId, userIdToUpdate);
          notifications(result.type, result.message);
        }
      } catch (e) {
        throw new Error();
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
