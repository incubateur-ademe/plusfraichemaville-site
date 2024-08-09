"use client";

import { resentInvitationAction } from "@/actions/users/resent-invitation-action";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { useTransition } from "react";
import { Spinner } from "../common/spinner";
import { notifications } from "../common/notifications";
import { generateRandomId, isProduction } from "@/helpers/common";
import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";

export const PartageOverviewMemberStatusInvited = ({ member }: { member: UserProjetWithUser }) => {
  const [isPending, startTransition] = useTransition();
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUser = useUserStore((state) => state.userInfos);

  const userProjetId = member.id;
  const projetId = member.projet_id;

  const handleResendInvitation = () => {
    startTransition(async () => {
      if (projet) {
        try {
          const newInvitationToken = `${generateRandomId()}`;

          const config = {
            link: isProduction
              ? // eslint-disable-next-line max-len
                `${process.env.URL_SITE_PROD}/espace-projet?tab=invitation&token=${newInvitationToken}`
              : // eslint-disable-next-line max-len
                `http://pfmv.localhost:3000/espace-projet?tab=invitation&token=${newInvitationToken}`,
            collectivite: projet.collectivite.nom,
            city: projet.collectivite.nom,
            projectName: projet.nom,
            mail: member.email_address,
            username: `${currentUser?.prenom} ${currentUser?.nom}`,
          };

          const result = await resentInvitationAction(userProjetId, projetId, config);
          notifications(result.type, result.message);
        } catch (e) {
          throw new Error();
        }
      }
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
