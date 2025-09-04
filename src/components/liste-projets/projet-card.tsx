import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PictoEspaceSelector } from "../common/pictos";
import { PictoId } from "../common/pictos/picto-espace-selector";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { InvitationStatus } from "@/src/generated/prisma/client";
import { Case, Conditional } from "../common/conditional-renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { getAllUserProjectCount, getCurrentUserProjectInfos, getOldestAdmin } from "./helpers";
import { useUserStore } from "@/src/stores/user/provider";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { useEffect, useMemo } from "react";
import { PartageOverviewPopupMenu } from "../partage/partage-overview-popup-menu";
import { useModalStore } from "@/src/stores/modal/provider";
import { hasDiscardedInformation } from "@/src/helpers/user";
import { MODE_LECTEUR_MODAL_ID } from "@/src/components/tableau-de-bord/viewer-mode-modal";
import { accessProjetAction } from "@/src/actions/userProjet/access-projet-action";
import { Maturite } from "../maturite/maturite";
import { getUserRoleFromCode } from "@/src/helpers/user-role";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useRouter } from "next/navigation";
import { useProjetCardActions } from "./use-projet-card-actions";

type ProjetCardProps = {
  projet: ProjetWithPublicRelations;
  invitationStatus?: InvitationStatus;
  isBrowsing?: boolean;
  updateProjet?: (_updatedProjet: ProjetWithPublicRelations) => void;
};

export const ProjetCard = ({ projet, invitationStatus, isBrowsing, updateProjet }: ProjetCardProps) => {
  const {
    isPending,
    updatedProjet,
    handleSendRequest,
    handleAcceptInvitation,
    handleDeclineInvitation,
    setUpdatedProjet,
  } = useProjetCardActions({ projet, updateProjet });
  const currentUser = useUserStore((state) => state.userInfos);
  const members = updatedProjet.users;

  const user = getOldestAdmin(updatedProjet)?.user;
  const adminUsername = `${user?.prenom} ${user?.nom}`;
  const router = useRouter();

  useEffect(() => {
    setUpdatedProjet(projet);
  }, [projet, setUpdatedProjet]);

  const setShowInfoViewerMode = useModalStore((state) => state.setShowInfoViewerMode);
  const isLecteur = useIsLecteur(projet.id);
  const openProjet = async () => {
    if (isLecteur && !hasDiscardedInformation(currentUser, MODE_LECTEUR_MODAL_ID)) {
      setShowInfoViewerMode(true);
    }
    if (currentUser) {
      await accessProjetAction(currentUser?.id, updatedProjet.id);
    }
    router.push(PFMV_ROUTES.TABLEAU_DE_BORD(updatedProjet.id));
  };

  const currentUserInfo = useMemo(
    () => getCurrentUserProjectInfos(updatedProjet, currentUser?.id),
    [currentUser?.id, updatedProjet],
  );
  const hasAlreadyRequest = currentUserInfo?.invitation_status === InvitationStatus.REQUESTED;
  const isMemberOfProjet = currentUserInfo?.invitation_status === InvitationStatus.ACCEPTED;

  return (
    <div
      className={clsx(
        "h-full w-full rounded-xl  p-4 text-start",
        invitationStatus === InvitationStatus.ACCEPTED ? "pfmv-card fr-enlarge-link" : "pfmv-card-no-hover",
      )}
    >
      <div className="flex w-full gap-6">
        <PictoEspaceSelector
          className={clsx("shrink-0", !isMemberOfProjet && "opacity-25")}
          pictoId={updatedProjet.type_espace as PictoId}
          withBackground
          size="large"
          pictoClassName="svg-blue"
        />
        <div className="flex w-full flex-col">
          <div className="flex justify-between gap-6">
            <div className={clsx(!isMemberOfProjet && "opacity-25")}>
              <h3 className="mb-0 text-[22px] text-dsfr-text-label-blue-france">{updatedProjet.nom}</h3>
              <h4 className="mb-4 text-lg text-dsfr-text-label-blue-france">
                <i className="ri-map-pin-line mr-1 before:!w-4"></i>
                {updatedProjet.collectivite.nom}
              </h4>
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
                <div className={clsx("h-full text-sm")}>
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
                  {(invitationStatus === InvitationStatus.INVITED ||
                    invitationStatus === InvitationStatus.ACCEPTED ||
                    invitationStatus === InvitationStatus.REQUESTED) && (
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
                  )}
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

          <div className="mt-auto">
            {invitationStatus === InvitationStatus.ACCEPTED && (
              <div className="flex w-full flex-row justify-between gap-4">
                <div className="flex items-center justify-end gap-2">
                  <label htmlFor="maturite-select" className="mt-1 text-sm font-bold text-pfmv-navy">
                    Maturité du projet :{" "}
                  </label>
                  <Maturite id="maturite-select" niveau={updatedProjet.niveau_maturite} projetId={updatedProjet.id} />
                </div>
                <div className={clsx("flex gap-4 text-sm")}>
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
              </div>
            )}
            {invitationStatus === InvitationStatus.INVITED && (
              <div className="flex w-full flex-row justify-between gap-4">
                <div className="flex h-8 items-center gap-4">
                  <Button
                    disabled={isPending}
                    priority="tertiary"
                    className="rounded-3xl"
                    onClick={handleDeclineInvitation}
                  >
                    Décliner
                  </Button>
                  <Button onClick={handleAcceptInvitation} disabled={isPending} className="rounded-3xl">
                    Rejoindre
                  </Button>
                </div>
                <div>Reçue le {dateToStringWithoutTime(currentUserInfo?.created_at)}</div>
              </div>
            )}
            {invitationStatus !== InvitationStatus.ACCEPTED &&
              invitationStatus !== InvitationStatus.INVITED &&
              !!isBrowsing && (
                <Button
                  disabled={isPending || hasAlreadyRequest}
                  priority="tertiary"
                  className="rounded-3xl"
                  onClick={handleSendRequest}
                >
                  {hasAlreadyRequest ? "Accès demandé" : "Demander un accès"}
                </Button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
