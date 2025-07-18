import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PictoEspaceSelector } from "../common/pictos";
import { PictoId } from "../common/pictos/picto-espace-selector";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { InvitationStatus } from "@/src/generated/prisma/client";
import { Case, Conditional, Default } from "../common/conditional-renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { getAllUserProjectCount, getCurrentUserProjectInfos, getOldestAdmin } from "./helpers";
import { useUserStore } from "@/src/stores/user/provider";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { useEffect, useMemo, useState, useTransition } from "react";
import { notifications } from "../common/notifications";
import { acceptProjectInvitationAction } from "@/src/actions/userProjet/accept-project-invitation-action";
import { declineProjectInvitationAction } from "@/src/actions/userProjet/decline-project-invitation-action";
import { requestToJoinProjectAction } from "@/src/actions/userProjet/request-to-join-project-action";
import { PartageOverviewPopupMenu } from "../partage/partage-overview-popup-menu";
import { useModalStore } from "@/src/stores/modal/provider";
import { hasDiscardedInformation } from "@/src/helpers/user";
import { MODE_LECTEUR_MODAL_ID } from "@/src/components/tableau-de-bord/viewer-mode-modal";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { getPendingUserProjetsAction } from "@/src/actions/projets/get-pending-user-projets-action";
import { accessProjetAction } from "@/src/actions/userProjet/access-projet-action";
import { Maturite } from "../maturite/maturite";
import { getUserRoleFromCode } from "@/src/helpers/user-role";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

type ListeProjetsCardProps = {
  projet: ProjetWithPublicRelations;
  invitationStatus?: InvitationStatus;
  isBrowsing?: boolean;
  updateProjet?: (_updatedProjet: ProjetWithPublicRelations) => void;
};

export const ListeProjetsCard = ({ projet, invitationStatus, isBrowsing, updateProjet }: ListeProjetsCardProps) => {
  const [updatedProjet, setUpdatedProjet] = useState(projet);
  const currentUser = useUserStore((state) => state.userInfos);
  const setPendingProjets = useProjetsStore((state) => state.setPendingProjets);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const deletePendingProjet = useProjetsStore((state) => state.deletePendingProjet);
  const members = updatedProjet.users;
  const [isPending, startTransition] = useTransition();

  const user = getOldestAdmin(updatedProjet)?.user;
  const adminUsername = `${user?.prenom} ${user?.nom}`;

  useEffect(() => {
    setUpdatedProjet(projet);
  }, [projet]);

  const setShowInfoViewerMode = useModalStore((state) => state.setShowInfoViewerMode);
  const isLecteur = useIsLecteur(projet.id);
  const openProjet = async () => {
    if (isLecteur && !hasDiscardedInformation(currentUser, MODE_LECTEUR_MODAL_ID)) {
      setShowInfoViewerMode(true);
    }
    if (currentUser) {
      await accessProjetAction(currentUser?.id, updatedProjet.id);
    }
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

  const contentCard = (
    <>
      <div className="relative mb-5 flex rounded-xl p-4">
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
                  <span>Admin : {adminUsername}</span>
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
                      "ml-auto block w-fit",
                      (invitationStatus === InvitationStatus.REQUESTED ||
                        invitationStatus === InvitationStatus.INVITED) &&
                        "opacity-25",
                    )}
                  >
                    ({getUserRoleFromCode(currentUserInfo?.role)?.label})
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
            <LinkWithoutPrefetch onClick={openProjet} href={PFMV_ROUTES.TABLEAU_DE_BORD(updatedProjet.id)}>
              {contentCard}
            </LinkWithoutPrefetch>
          </div>
        </Case>
        <Default>
          <div className="pfmv-card-no-hover">{contentCard}</div>
        </Default>
      </Conditional>
      <Conditional>
        <Case condition={invitationStatus === InvitationStatus.ACCEPTED}>
          <div className="absolute bottom-4 left-[11rem] flex h-8 items-center gap-4">
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm font-bold text-pfmv-navy">Maturité du projet : </span>
              <Maturite niveau={updatedProjet.niveau_maturite} projetId={updatedProjet.id} />
            </div>
          </div>
          <div className={clsx("absolute bottom-5 right-5 flex gap-4 text-sm")}>
            <LinkWithoutPrefetch
              className="fr-btn--tertiary fr-btn--sm fr-btn fr-btn--icon-left rounded-3xl"
              onClick={openProjet}
              href={PFMV_ROUTES.TABLEAU_DE_BORD(updatedProjet.id)}
            >
              Accéder au projet
            </LinkWithoutPrefetch>
            <PartageOverviewPopupMenu
              members={members}
              projectId={updatedProjet.id}
              currentUserInfo={currentUserInfo}
            />
          </div>
        </Case>
        <Case condition={invitationStatus === InvitationStatus.INVITED}>
          <div className="absolute bottom-4 left-[11rem] flex h-8 items-center gap-4">
            <Button disabled={isPending} priority="tertiary" className="rounded-3xl" onClick={handleDeclineInvitation}>
              Décliner
            </Button>
            <Button onClick={handleAcceptInvitation} disabled={isPending} className="rounded-3xl">
              Rejoindre
            </Button>
          </div>
        </Case>
        <Case condition={isBrowsing === true}>
          <div className="absolute bottom-4 left-[11rem] flex h-8 items-center gap-4">
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
