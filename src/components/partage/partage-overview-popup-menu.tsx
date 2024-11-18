"use client";

import { useModalStore } from "@/src/stores/modal/provider";
import { PopupMenu } from "../common/popup-menu";
import { ProjetWithPublicRelations, UserProjetWithPublicInfos } from "@/src/lib/prisma/prismaCustomTypes";
import { checkOtherAdminExists } from "./helpers";
import { useTransition } from "react";
import { leaveProjetAction } from "@/src/actions/projets/leave-projet-action";
import { notifications } from "../common/notifications";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { deleteProjetAction } from "@/src/actions/projets/delete-projet-action";
import { RoleProjet } from "@prisma/client";

type PartageOverviewPopupMenuProps = {
  projectId: number;
  currentUserInfo: UserProjetWithPublicInfos | null;
  members: ProjetWithPublicRelations["users"];
};
export const PartageOverviewPopupMenu = ({ projectId, currentUserInfo, members }: PartageOverviewPopupMenuProps) => {
  const [, startTransition] = useTransition();
  const setCurrentDeleteOrQuitModal = useModalStore((state) => state.setCurrentDeleteOrQuitModal);
  const deleteStoredProjet = useProjetsStore((state) => state.deleteProjet);

  const currentUserId = currentUserInfo?.user_id;
  const hasOtherAdmin = checkOtherAdminExists(members, currentUserInfo?.user_id);
  const isAdmin = currentUserInfo?.role === RoleProjet.ADMIN;
  const canLeaveProject = !isAdmin || (isAdmin && hasOtherAdmin);

  const handleQuitProject = () => {
    startTransition(async () => {
      if (currentUserId && projectId) {
        const result = await leaveProjetAction(currentUserId, projectId);
        notifications(result.type, result.message);
        if (result.type === "success") {
          deleteStoredProjet(projectId);
        }
      }
    });
  };
  const handleDeleteProject = () => {
    startTransition(async () => {
      if (currentUserId && projectId) {
        const res = await deleteProjetAction(projectId);
        if (res.type === "success") {
          deleteStoredProjet(projectId);
        }
        notifications(res.type, res.message);
      }
    });
  };

  const links = [
    {
      label: "Quitter le projet",
      iconId: "ri-door-open-fill",
      className: "text-pfmv-navy w-44",
      onClick: () =>
        setCurrentDeleteOrQuitModal({
          options: {
            action: async () => {
              canLeaveProject && handleQuitProject();
            },
            confirmLabel: canLeaveProject ? "Quitter le projet" : null,
            title: canLeaveProject ? "Quitter le projet" : " Impossible de quitter le projet",
            description: canLeaveProject
              ? "Êtes-vous certain de vouloir quitter le projet ? " +
                "Si vous souhaitez le réintégrer par la suite, vous devrez faire une demande d’accès."
              : "Vous êtes le seul administrateur du projet. " +
                "Pour quitter le projet, il vous faut définir un nouvel administrateur.",
          },
        }),
    },
    {
      label: "Supprimer le projet",
      iconId: "ri-delete-bin-fill",
      className: "text-pfmv-climadiag-red w-44",
      onClick: () =>
        setCurrentDeleteOrQuitModal({
          options: {
            action: async () => {
              isAdmin && handleDeleteProject();
            },
            confirmLabel: "Supprimer le projet",
            title: "Supprimer le projet",
            description:
              "Attention, cette action est irréversible va impacter les autres membres invités sur votre projet. " +
              "Toutes les informations seront perdues.",
          },
        }),
    },
  ];

  const linksByRole = isAdmin ? [links[1]] : [links[0]];

  return <PopupMenu links={linksByRole} />;
};
