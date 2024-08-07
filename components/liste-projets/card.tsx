import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import Link from "next/link";
import { PictoEspaceSelector } from "../common/pictos";
import { PictoId } from "../common/pictos/picto-espace-selector";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";
import { InvitationStatus } from "@prisma/client";
import { Case, Conditional, Default } from "../common/conditional-renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { getAllUserProjectCount, getCurrentUserProjectInfos, getOldestAdmin } from "./helpers";
import { useUserStore } from "@/stores/user/provider";
import { dateToStringWithoutTime } from "@/helpers/dateUtils";
import { useTransition } from "react";
import { notifications } from "../common/notifications";
import { acceptProjectInvitationAction } from "@/actions/userProjet/accept-project-invitation-action";
import { declineProjectInvitationAction } from "@/actions/userProjet/decline-project-invitation-action";
import { requestToJoinProjectAction } from "@/actions/userProjet/request-to-join-project-action";
import { PartageOverviewPopupMenu } from "../partage/partage-overview-popup-menu";
import { getCurrentUserRole } from "../partage/helpers";
import { useModalStore } from "@/stores/modal/provider";

type ListeProjetsCardProps = {
  disabled?: boolean;
  projet: ProjetWithRelations;
  invitationStatus?: InvitationStatus;
  isBrowsing?: boolean;
};

export const ListeProjetsCard = ({ projet, invitationStatus, disabled, isBrowsing }: ListeProjetsCardProps) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const currentUserMail = useUserStore((state) => state.userInfos?.email);
  const currentUserInfo = getCurrentUserProjectInfos(projet, currentUserId);
  const members = projet.users;
  const [isPending, startTransition] = useTransition();

  const setDiscardViewerMode = useModalStore((state) => state.setCurrentDiscardViewerMode);
  const isLecteur = (projet && getCurrentUserRole(projet.users, currentUserId) !== "ADMIN") ?? false;
  const openDiscardViewerMode = () => isLecteur && setDiscardViewerMode(true);

  const hasAlreadyRequest = getCurrentUserProjectInfos(projet, currentUserId)?.invitation_status === "REQUESTED";

  const handleSendRequest = () => {
    startTransition(async () => {
      try {
        if (currentUserId && currentUserMail) {
          const result = await requestToJoinProjectAction(currentUserId, projet.id, currentUserMail);
          notifications(result.type, result.message);
        }
      } catch (e) {
        throw new Error();
      }
    });
  };

  const handleAcceptInvitation = () => {
    startTransition(async () => {
      try {
        if (currentUserId) {
          const result = await acceptProjectInvitationAction(currentUserId, projet.id);
          notifications(result.type, result.message);
        }
      } catch (e) {
        throw new Error();
      }
    });
  };

  const handleDeclineInvitation = () => {
    startTransition(async () => {
      try {
        if (currentUserId) {
          const result = await declineProjectInvitationAction(currentUserId, projet.id);
          notifications(result.type, result.message);
        }
      } catch (e) {
        throw new Error();
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
            (invitationStatus === "REQUESTED" || invitationStatus === "INVITED" || isBrowsing === true) && "opacity-25",
          )}
        >
          <div className="mr-6">
            <PictoEspaceSelector
              pictoId={projet.type_espace as PictoId}
              withBackground
              size="large"
              pictoClassName="svg-blue"
            />
          </div>
          <div>
            <h3 className="mb-0 text-[22px] text-dsfr-text-label-blue-france">{projet.nom}</h3>
            <h4 className="mb-4 text-lg text-dsfr-text-label-blue-france">
              <i className="ri-map-pin-line mr-1 before:!w-4"></i>
              {projet.collectivite.nom}
            </h4>
          </div>
        </div>
        <Conditional>
          <Case
            condition={
              invitationStatus === "ACCEPTED" ||
              invitationStatus === "INVITED" ||
              invitationStatus === "REQUESTED" ||
              isBrowsing === true
            }
          >
            <div className={clsx("absolute right-5 top-5 h-full text-sm")}>
              <div
                className={clsx(
                  "mb-2 flex items-center gap-6",

                  (invitationStatus === "REQUESTED" || invitationStatus === "INVITED" || isBrowsing === true) &&
                    "opacity-25",
                )}
              >
                <div className="flex items-center gap-2">
                  <i className="ri-team-fill text-pfmv-navy"></i>
                  {getAllUserProjectCount(projet)}
                </div>
                <div>
                  <span>Admin : {getOldestAdmin(projet).username}</span>
                </div>
              </div>
              <Conditional>
                <Case
                  condition={
                    invitationStatus === "INVITED" ||
                    invitationStatus === "ACCEPTED" ||
                    invitationStatus === "REQUESTED"
                  }
                >
                  <span
                    className={clsx(
                      "ml-auto block w-fit lowercase",
                      (invitationStatus === "REQUESTED" || invitationStatus === "INVITED") && "opacity-25",
                    )}
                  >
                    ({currentUserInfo?.role})
                  </span>
                </Case>
              </Conditional>
              <Conditional>
                <Case condition={invitationStatus === "INVITED"}>
                  {currentUserInfo && (
                    <div className="absolute bottom-10 right-0">
                      Reçue le
                      {invitationStatus === "INVITED" && dateToStringWithoutTime(currentUserInfo?.created_at)}
                    </div>
                  )}
                </Case>
              </Conditional>
              <Conditional>
                <Case condition={isBrowsing === true || invitationStatus === "REQUESTED"}>
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
        <Case condition={invitationStatus === "ACCEPTED"}>
          <div className="pfmv-card">
            <Link onClick={openDiscardViewerMode} href={PFMV_ROUTES.TABLEAU_DE_BORD(projet.id)}>
              {contentCard}
            </Link>
          </div>
        </Case>
        <Default>
          <div className="pfmv-card-no-hover">{contentCard}</div>
        </Default>
      </Conditional>
      <Conditional>
        <Case condition={invitationStatus === "ACCEPTED"}>
          <div className="absolute bottom-6 left-[11.5rem] flex h-8 items-center gap-4">
            <Link
              className="fr-btn--tertiary fr-btn--sm fr-btn fr-btn--icon-left rounded-3xl"
              href={PFMV_ROUTES.TABLEAU_DE_BORD(projet.id)}
              style={{ ...disabledButton }}
            >
              Accéder au projet
            </Link>
          </div>
          <div className={clsx("absolute bottom-5 right-5 text-sm")}>
            <PartageOverviewPopupMenu members={members} projectId={projet.id} currentUserInfo={currentUserInfo} />
          </div>
        </Case>
        <Case condition={invitationStatus === "INVITED"}>
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
