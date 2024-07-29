"use client";

import { useModalStore } from "@/stores/modal/provider";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import { deleteUserFromProjetAction } from "@/actions/users/delete-user-from-projet";
import { useUserStore } from "@/stores/user/provider";
import { notifications } from "../common/notifications";
import { PopupMenu } from "../common/popup-menu";

export type PartageOverviewMemberStatusAdminProps = {
  member: UserProjetWithUser;
  isCurrentUser?: boolean;
};

export const PartageOverviewMemberStatusAcceptedAdmin = (props: PartageOverviewMemberStatusAdminProps) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const setCurrentDeleteOrQuitModal = useModalStore((state) => state.setCurrentDeleteOrQuitModal);
  // TODO: À garder selon règles métier.
  // const setCurrentUserModification = useModalStore((state) => state.setCurrentUserModification);

  const links = [
    // TODO: À garder selon règles métier.
    // {
    //   label: "Modifier les accès",
    //   iconId: "ri-pencil-fill",
    //   className: "text-dsfr-text-label-blue-france",
    //   onClick: () => setCurrentUserModification(props),
    // },
    {
      label: "Supprimer le membre",
      iconId: "ri-delete-bin-fill",
      className: "text-pfmv-climadiag-red",
      onClick: () =>
        setCurrentDeleteOrQuitModal({
          member: props.member,
          options: {
            action: async () => {
              if (currentUserId && props.member.user_id && props.member.projet_id) {
                const result = await deleteUserFromProjetAction(
                  currentUserId,
                  props.member.user_id,
                  props.member.projet_id,
                );
                console.log("result ====>", result);
                notifications(result.type, result.message);
              }
            },
            confirmLabel: "Supprimer le membre",
            title: "Supprimer le membre",
            description:
              // eslint-disable-next-line max-len
              "Le membre n’aura plus accès au projet. Il pourra rejoindre le projet à nouveau par le biais d'une invitation ou d'une demande d'accès.",
          },
        }),
    },
  ];

  return (
    <div className="relative flex items-center justify-between">
      <div>
        <i className="ri-checkbox-circle-fill mr-2 size-6 text-dsfr-background-action-high-success-hover"></i>
        activé
      </div>
      {!props.isCurrentUser && <PopupMenu links={links} />}
    </div>
  );
};
