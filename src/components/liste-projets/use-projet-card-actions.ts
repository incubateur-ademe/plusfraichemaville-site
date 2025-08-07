import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { useUserStore } from "@/src/stores/user/provider";
import { useEffect, useState, useTransition } from "react";
import { notifications } from "../common/notifications";
import { acceptProjectInvitationAction } from "@/src/actions/userProjet/accept-project-invitation-action";
import { declineProjectInvitationAction } from "@/src/actions/userProjet/decline-project-invitation-action";
import { requestToJoinProjectAction } from "@/src/actions/userProjet/request-to-join-project-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { getPendingUserProjetsAction } from "@/src/actions/projets/get-pending-user-projets-action";

type UseProjetCardActionsProps = {
  projet: ProjetWithPublicRelations;
  updateProjet?: (_updatedProjet: ProjetWithPublicRelations) => void;
};

export const useProjetCardActions = ({ projet, updateProjet }: UseProjetCardActionsProps) => {
  const [updatedProjet, setUpdatedProjet] = useState(projet);
  const currentUser = useUserStore((state) => state.userInfos);
  const setPendingProjets = useProjetsStore((state) => state.setPendingProjets);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const deletePendingProjet = useProjetsStore((state) => state.deletePendingProjet);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setUpdatedProjet(projet);
  }, [projet]);

  const handleSendRequest = () => {
    startTransition(async () => {
      if (currentUser?.id) {
        const result = await requestToJoinProjectAction(currentUser.id, updatedProjet.id);
        notifications(result.type, result.message);
        if (result.updatedProjet && updateProjet) {
          updateProjet(result.updatedProjet);
          setUpdatedProjet(result.updatedProjet);
          const pendingProjetsActionResult = await getPendingUserProjetsAction(currentUser.id);
          if (pendingProjetsActionResult.pendingProjets) {
            setPendingProjets(pendingProjetsActionResult.pendingProjets);
          }
        }
      }
    });
  };

  const handleAcceptInvitation = () => {
    startTransition(async () => {
      if (currentUser?.id) {
        const result = await acceptProjectInvitationAction(currentUser.id, updatedProjet.id);
        notifications(result.type, result.message);
        if (result.type === "success" && result.projet) {
          deletePendingProjet(updatedProjet.id);
          addOrUpdateProjet(result.projet);
        }
      }
    });
  };

  const handleDeclineInvitation = () => {
    startTransition(async () => {
      if (currentUser?.id) {
        const result = await declineProjectInvitationAction(currentUser.id, updatedProjet.id);
        notifications(result.type, result.message);
        if (result.type === "success") {
          deletePendingProjet(updatedProjet.id);
        }
      }
    });
  };

  return {
    isPending,
    updatedProjet,
    handleSendRequest,
    handleAcceptInvitation,
    handleDeclineInvitation,
    setUpdatedProjet,
  };
};
