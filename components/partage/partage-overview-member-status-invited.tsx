"use client";

import { resendInvitationAction } from "@/actions/users/resend-invitation-action";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { useTransition } from "react";
import { Spinner } from "../common/spinner";
import { notifications } from "../common/notifications";

export const PartageOverviewMemberStatusInvited = ({ member }: { member: UserProjetWithUser }) => {
  const [isPending, startTransition] = useTransition();

  const userProjetId = member.id;

  const handleResendInvitation = () => {
    startTransition(async () => {
      const result = await resendInvitationAction(userProjetId);
      notifications(result.type, result.message);
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={clsx(
            "mr-2 flex size-5 items-center justify-center rounded-full bg-dsfr-border-default-yellow-moutarde py-[2px]",
          )}
        >
          <i className={clsx("ri-mail-send-line", "flex h-3 shrink-0 text-white before:!size-[12px]")}></i>
        </div>
        <span>envoyé</span>
      </div>
      <Button priority="tertiary" onClick={handleResendInvitation} disabled={isPending} className="rounded-[20px]">
        {isPending ? <Spinner /> : "Renvoyer"}
      </Button>
    </div>
  );
};
