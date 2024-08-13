"use client";

import { useModalStore } from "@/stores/modal/provider";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import { deleteUserFromProjetAction } from "@/actions/userProjet/delete-user-from-projet-action";
import { useUserStore } from "@/stores/user/provider";
import { notifications } from "../common/notifications";
import { PopupMenu } from "../common/popup-menu";
import { getCurrentUserRole } from "./helpers";
import { useProjetsStore } from "@/stores/projets/provider";

export type PartageOverviewMemberStatusAdminProps = {
  member: UserProjetWithUser;
  isCurrentUser?: boolean;
};

export const PartageOverviewMemberStatusAcceptedAdmin = (props: PartageOverviewMemberStatusAdminProps) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const members = useProjetsStore((state) => state.getCurrentProjet())?.users;
  const setCurrentDeleteOrQuitModal = useModalStore((state) => state.setCurrentDeleteOrQuitModal);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const currentUserRole = getCurrentUserRole(members, currentUserId);

  const links = [
    {
      label: "Supprimer le membre",
      iconId: "ri-delete-bin-fill",
      className: "text-pfmv-climadiag-red",
      onClick: () =>
        setCurrentDeleteOrQuitModal({
          member: props.member,
          options: {
            action: async () => {
              if (props.member.user_id && props.member.projet_id) {
                const result = await deleteUserFromProjetAction(props.member.user_id, props.member.projet_id);
                notifications(result.type, result.message);
                if (result.type === "success" && result.updatedProjet) {
                  addOrUpdateProjet(result.updatedProjet);
                }
              }
            },
            confirmLabel: "Supprimer le membre",
            title: "Supprimer le membre",
            description:
              "Le membre n’aura plus accès au projet. " +
              "Il pourra rejoindre le projet à nouveau par le biais d'une invitation ou d'une demande d'accès.",
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
      {!props.isCurrentUser && currentUserRole === "ADMIN" && <PopupMenu links={links} />}
    </div>
  );
};
