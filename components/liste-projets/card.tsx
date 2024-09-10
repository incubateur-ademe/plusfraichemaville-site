import { ProjetWithPublicRelations } from "@/lib/prisma/prismaCustomTypes";
import Link from "next/link";
import { PictoEspaceSelector } from "../common/pictos";
import { PictoId } from "../common/pictos/picto-espace-selector";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";
import { InvitationStatus, RoleProjet } from "@prisma/client";
import { Case, Conditional, Default } from "../common/conditional-renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { getAllUserProjectCount, getCurrentUserProjectInfos, getOldestAdmin } from "./helpers";
import { useUserStore } from "@/stores/user/provider";
import { dateToStringWithoutTime } from "@/helpers/dateUtils";
import { useMemo, useState, useTransition } from "react";
import { notifications } from "../common/notifications";
import { acceptProjectInvitationAction } from "@/actions/userProjet/accept-project-invitation-action";
import { declineProjectInvitationAction } from "@/actions/userProjet/decline-project-invitation-action";
import { requestToJoinProjectAction } from "@/actions/userProjet/request-to-join-project-action";
import { PartageOverviewPopupMenu } from "../partage/partage-overview-popup-menu";
import { getCurrentUserRole } from "../partage/helpers";
import { useModalStore } from "@/stores/modal/provider";
import { hasDiscardedInformation } from "@/helpers/user";
import { MODE_LECTEUR_MODAL_ID } from "@/components/tableau-de-bord/viewer-mode-modal";
import { useProjetsStore } from "@/stores/projets/provider";
import { getPendingUserProjetsAction } from "@/actions/projets/get-pending-user-projets-action";
import { accessProjetAction } from "@/actions/userProjet/access-projet-action";

type ListeProjetsCardProps = {
  disabled?: boolean;
  projet: ProjetWithPublicRelations;
  invitationStatus?: InvitationStatus;
  isBrowsing?: boolean;
  updateProjet?: (_updatedProjet: ProjetWithPublicRelations) => void;
};

export const ListeProjetsCard = ({
  projet,
  invitationStatus,
  disabled,
  isBrowsing,
  updateProjet,
}: ListeProjetsCardProps) => {
  const [updatedProjet, setUpdatedProjet] = useState(projet);
  const currentUser = useUserStore((state) => state.userInfos);
  const setPendingProjets = useProjetsStore((state) => state.setPendingProjets);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const deletePendingProjet = useProjetsStore((state) => state.deletePendingProjet);
  const members = updatedProjet.users;
  const [isPending, startTransition] = useTransition();

  const setShowInfoViewerMode = useModalStore((state) => state.setShowInfoViewerMode);
  const isLecteur =
    (updatedProjet && getCurrentUserRole(updatedProjet.users, currentUser?.id) !== RoleProjet.ADMIN) ?? false;
  const openProjet = async () => {
    if (isLecteur && !hasDiscardedInformation(currentUser, MODE_LECTEUR_MODAL_ID)) {
      setShowInfoViewerMode(true);
    }
    await accessProjetAction(updatedProjet.id);
  };

  const currentUserInfo = useMemo(
    () => getCurrentUserProjectInfos(updatedProjet, currentUser?.id),
    [currentUser?.id, updatedProjet],
  );
  const hasAlreadyRequest = currentUserInfo?.invitation_status === InvitationStatus.REQUESTED;

  const handleSendRequest = () => {
    startTransition(async () => {
      if (currentUser?.id) {
        const result = await requestToJoinProjectAction(currentUser?.id, updatedProjet.id);
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
        const result = await acceptProjectInvitationAction(currentUser?.id, updatedProjet.id);
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
        const result = await declineProjectInvitationAction(currentUser?.id, updatedProjet.id);
        notifications(result.type, result.message);
        if (result.type === "success") {
          deletePendingProjet(updatedProjet.id);
        }
      }
    });
  };

  const disabledText = disabled && "[&>*>*]:text-dsfr-text-disabled-grey pointer-events-none";
  const disabledButton = disabled && {
    color: "var(--grey-625-425)",
    border: "solid 1px var(--grey-625-425) !important",
    background: "none",
    boxShadow: "none",
  };

  const contentCard = (
    <>
      <div className={clsx(`relative mb-5 flex rounded-xl p-5 ${disabledText}`)}>
        <div
          className={clsx(
            "flex",
            (invitationStatus === InvitationStatus.REQUESTED ||
              invitationStatus === InvitationStatus.INVITED ||
              isBrowsing === true) &&
              "opacity-25",
          )}
        >
          <div className="mr-6">
            <PictoEspaceSelector
              pictoId={updatedProjet.type_espace as PictoId}
              withBackground
              size="large"
              pictoClassName="svg-blue"
            />
          </div>
          <div>
            <h3 className="mb-0 text-[22px] text-dsfr-text-label-blue-france">{updatedProjet.nom}</h3>
            <h4 className="mb-4 text-lg text-dsfr-text-label-blue-france">
              <i className="ri-map-pin-line mr-1 before:!w-4"></i>
              {updatedProjet.collectivite.nom}
            </h4>
          </div>
        </div>
        <Conditional>
          <Case
            condition={
              invitationStatus === InvitationStatus.ACCEPTED ||
              invitationStatus === InvitationStatus.INVITED ||
              invitationStatus === InvitationStatus.REQUESTED ||
              isBrowsing === true
            }
          >
            <div className={clsx("absolute right-5 top-5 h-full text-sm")}>
              <div
                className={clsx(
                  "mb-2 flex items-center gap-6",

                  (invitationStatus === InvitationStatus.REQUESTED ||
                    invitationStatus === InvitationStatus.INVITED ||
                    isBrowsing === true) &&
                    "opacity-25",
                )}
              >
                <div
                  className={clsx(
                    "new-project-acess-badge rounded p-1 text-xs font-bold text-pfmv-navy",
                    "bg-dsfr-background-contrast-blue-france",
                    (currentUserInfo?.invitation_status !== InvitationStatus.ACCEPTED ||
                      (currentUserInfo?.nb_views || 0) > 0) &&
                      "hidden",
                  )}
                >
                  Nouvel accès
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-team-fill text-pfmv-navy"></i>
                  {getAllUserProjectCount(updatedProjet)}
                </div>
                <div>
                  <span>Admin : {getOldestAdmin(updatedProjet).username}</span>
                </div>
              </div>
              <Conditional>
                <Case
                  condition={
                    invitationStatus === InvitationStatus.INVITED ||
                    invitationStatus === InvitationStatus.ACCEPTED ||
                    invitationStatus === InvitationStatus.REQUESTED
                  }
                >
                  <span
                    className={clsx(
                      "ml-auto block w-fit lowercase",
                      (invitationStatus === InvitationStatus.REQUESTED ||
                        invitationStatus === InvitationStatus.INVITED) &&
                        "opacity-25",
                    )}
                  >
                    ({currentUserInfo?.role})
                  </span>
                </Case>
              </Conditional>
              <Conditional>
                <Case condition={invitationStatus === InvitationStatus.INVITED}>
                  {currentUserInfo && (
                    <div className="absolute bottom-10 right-0">
                      Reçue le{" "}
                      {invitationStatus === InvitationStatus.INVITED &&
                        dateToStringWithoutTime(currentUserInfo?.created_at)}
                    </div>
                  )}
                </Case>
              </Conditional>
              <Conditional>
                <Case condition={isBrowsing === true || invitationStatus === InvitationStatus.REQUESTED}>
                  {hasAlreadyRequest ? (
                    <span className={clsx("flex items-center gap-2", "mt-4 justify-end")}>
                      <i className="ri-hourglass-fill text-pfmv-climadiag-red"></i>
                      En attente
                    </span>
                  ) : (
                    <span className={clsx("flex items-center gap-2", "mt-4 justify-end")}>
                      <i className="ri-lock-fill text-pfmv-climadiag-red"></i>
                      Accès restreint
                    </span>
                  )}
                </Case>
              </Conditional>
            </div>
          </Case>
        </Conditional>
      </div>
    </>
  );

  return (
    <div className="relative">
      <Conditional>
        <Case condition={invitationStatus === InvitationStatus.ACCEPTED}>
          <div className="pfmv-card">
            <Link onClick={openProjet} href={PFMV_ROUTES.TABLEAU_DE_BORD(updatedProjet.id)}>
              {contentCard}
            </Link>
          </div>
        </Case>
        <Default>
          <div className="pfmv-card-no-hover">{contentCard}</div>
        </Default>
      </Conditional>
      <Conditional>
        <Case condition={invitationStatus === InvitationStatus.ACCEPTED}>
          <div className="absolute bottom-6 left-[11.5rem] flex h-8 items-center gap-4">
            <Link
              className="fr-btn--tertiary fr-btn--sm fr-btn fr-btn--icon-left rounded-3xl"
              onClick={openProjet}
              href={PFMV_ROUTES.TABLEAU_DE_BORD(updatedProjet.id)}
              style={{ ...disabledButton }}
            >
              Accéder au projet
            </Link>
          </div>
          <div className={clsx("absolute bottom-5 right-5 text-sm")}>
            <PartageOverviewPopupMenu
              members={members}
              projectId={updatedProjet.id}
              currentUserInfo={currentUserInfo}
            />
          </div>
        </Case>
        <Case condition={invitationStatus === InvitationStatus.INVITED}>
          <div className="absolute bottom-6 left-[11.5rem] flex h-8 items-center gap-4">
            <Button disabled={isPending} priority="tertiary" className="rounded-3xl" onClick={handleDeclineInvitation}>
              Décliner
            </Button>
            <Button onClick={handleAcceptInvitation} disabled={isPending} className="rounded-3xl">
              Rejoindre
            </Button>
          </div>
        </Case>
        <Case condition={isBrowsing === true}>
          <div className="absolute bottom-6 left-[11.5rem] flex h-8 items-center gap-4">
            <Button
              disabled={isPending || hasAlreadyRequest}
              priority="tertiary"
              className="rounded-3xl"
              onClick={handleSendRequest}
            >
              {hasAlreadyRequest ? "Accès demandé" : "Demander un accès"}
            </Button>
          </div>
        </Case>
      </Conditional>
    </div>
  );
};
