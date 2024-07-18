import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { ListeProjetsCardDeleteModal } from "./card-delete-modal";
import Link from "next/link";
import { PictoEspaceSelector } from "../common/pictos";
import { PictoId } from "../common/pictos/picto-espace-selector";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";
import { InvitationStatus } from "@prisma/client";
import { Case, Conditional } from "../common/conditional-renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { getCurrentUserProjectInfos, getOldestAdmin } from "./helpers";
import { useUserStore } from "@/stores/user/provider";
import { dateToStringWithoutTime } from "@/helpers/dateUtils";

type ListeProjetsCardProps = {
  disabled?: boolean;
  projet: ProjetWithRelations;
  invitationStatus: InvitationStatus;
};

export const ListeProjetsCard = ({ projet, invitationStatus, disabled }: ListeProjetsCardProps) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const currentUserInfo = getCurrentUserProjectInfos(projet, currentUserId);

  const disabledText = disabled && "[&>*>*]:text-dsfr-text-disabled-grey pointer-events-none";
  const disabledButton = disabled && {
    color: "var(--grey-625-425)",
    border: "solid 1px var(--grey-625-425) !important",
    background: "none",
    boxShadow: "none",
  };

  return (
    <div className="relative">
      <Link href={PFMV_ROUTES.TABLEAU_DE_BORD(projet.id)}>
        <div className={`pfmv-card relative mb-5 flex rounded-xl p-5 ${disabledText}`}>
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
          <Conditional>
            <Case condition={invitationStatus === "ACCEPTED"}>
              <div
                className={clsx(
                  "absolute right-5 top-5 text-sm",
                  "before:mr-2 before:inline-block before:h-[10px] before:w-[10px]",
                  "before:rounded-full before:bg-dsfr-background-action-high-success-hover",
                )}
              >
                En cours
              </div>
            </Case>
            <Case condition={invitationStatus === "INVITED"}>
              <div className="absolute right-5 top-5 h-full text-sm">
                <div className="mb-2 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <i className="ri-team-fill text-pfmv-navy"></i>
                    {projet.users.length}
                  </div>
                  <div>
                    <span>Admin : {getOldestAdmin(projet).username}</span>
                  </div>
                </div>
                <span className="ml-auto block w-fit lowercase">({currentUserInfo?.role})</span>
                <div className="absolute bottom-10 right-0">
                  Reçue le {dateToStringWithoutTime(currentUserInfo?.created_at!)}
                </div>
              </div>
            </Case>
          </Conditional>
        </div>
      </Link>
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
            <ListeProjetsCardDeleteModal projetId={projet.id} projetNom={projet.nom} />
          </div>
        </Case>
        <Case condition={invitationStatus === "INVITED"}>
          <div className="absolute bottom-6 left-[11.5rem] flex h-8 items-center gap-4">
            <Button priority="tertiary" className="rounded-3xl">
              Décliner
            </Button>
            <Button className="rounded-3xl">Rejoindre</Button>
          </div>
        </Case>
      </Conditional>
    </div>
  );
};
