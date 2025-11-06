"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import { checkOtherAdminExists, getCurrentUserRole } from "./helpers";
import { useUserStore } from "@/src/stores/user/provider";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useTransition } from "react";
import { leaveProjetAction } from "@/src/actions/projets/leave-projet-action";
import { notifications } from "../../common/notifications";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { RoleProjet } from "@/src/generated/prisma/client";

const modal = createModal({
  id: "partage-overview-quit-project",
  isOpenedByDefault: false,
});

export const PartageOverviewQuit = () => {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const currentProjetId = useProjetsStore((state) => state.getCurrentProjet()?.id);
  const members = useProjetsStore((state) => state.getCurrentProjet()?.users);
  const deleteProjetFromStore = useProjetsStore((state) => state.deleteProjet);

  const hasOtherAdmins = checkOtherAdminExists(members, currentUserId);
  const currentUserRole = getCurrentUserRole(members, currentUserId);

  const handleQuitProject = () => {
    startTransition(async () => {
      if (currentUserId && currentProjetId) {
        const result = await leaveProjetAction(currentUserId, currentProjetId);
        notifications(result.type, result.message);
        if (result?.type === "success") {
          deleteProjetFromStore(currentProjetId);
          modal.close();
          push(PFMV_ROUTES.ESPACE_PROJET);
        }
      }
    });
  };

  if (!currentUserRole || currentUserRole === RoleProjet.ADMIN) {
    return null;
  }

  return (
    <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-8 py-6">
      <div className="w-full max-w-4xl">
        <h2 className="mb-4 text-[22px] font-bold">Quitter le projet</h2>
        <span className="text-pfmv-grey">
          {hasOtherAdmins
            ? ""
            : "Vous êtes le seul administrateur du projet. Pour quitter le projet, définissez un nouvel administrateur"}
          Vous ne recevrez plus de mails de notification sur {"l'activité"} du projet. Vous ne ferez plus partie des
          membres du projet et donc ne pourrez plus consulter son détail. Vous pourrez demander à être invité à nouveau
          par le référent du projet ou {"l'équipe"} de suivi.
        </span>
      </div>
      <Button
        nativeButtonProps={modal.buttonProps}
        className="rounded-[30px] !text-pfmv-climadiag-red disabled:!text-pfmv-grey"
        priority="tertiary"
        disabled={!hasOtherAdmins}
      >
        Quitter le projet
      </Button>
      <modal.Component size="large" title="Quitter le projet">
        <span className="mb-4 block">
          Êtes-vous certain de vouloir quitter le projet ? Si vous souhaitez le réintégrer par la suite, vous devrez
          faire une demande {"d'accès"}
        </span>
        <div className="ml-auto flex w-fit gap-4">
          <Button className="rounded-[30px]" priority="tertiary" onClick={modal.close}>
            Annuler
          </Button>
          <Button
            className="rounded-[30px] !text-pfmv-climadiag-red"
            priority="tertiary"
            disabled={isPending}
            onClick={() => {
              handleQuitProject();
            }}
          >
            Quitter le projet
          </Button>
        </div>
      </modal.Component>
    </div>
  );
};
