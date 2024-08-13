import { InvitationStatus } from "@prisma/client";
import { ListeProjetsCard } from "./card";
import { ProjetsByCollectivite } from "./helpers";

import { ListProjetsHeaderEmpty } from "./empty";
import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/stores/modal/provider";
import { Case, Conditional } from "../common/conditional-renderer";
import { useUserStore } from "@/stores/user/provider";

export const ListeProjetTab = ({
  projets,
  invitationStatus,
}: {
  projets: ProjetsByCollectivite[];
  invitationStatus: InvitationStatus;
}) => {
  const setCollectiviteIdToListAvailableProjets = useModalStore(
    (state) => state.setCollectiviteIdToListAvailableProjets,
  );
  const userCollectiviteId = useUserStore((state) => state.userInfos?.collectivites[0].collectivite_id);

  if (!projets.length) {
    return (
      <div className="w-full">
        <Conditional>
          <Case condition={invitationStatus === "ACCEPTED"}>
            <ListProjetsHeaderEmpty />
            <div className="ml-auto mt-5 w-fit rounded-[10px] !border-[1px] !border-pfmv-navy text-sm">
              <Button
                iconId="ri-add-circle-fill"
                priority="tertiary no outline"
                onClick={() => userCollectiviteId && setCollectiviteIdToListAvailableProjets(userCollectiviteId)}
                className="rounded-[10px]"
              >
                Rejoindre {"d'autres"} projets de ma collectivité
              </Button>
            </div>
          </Case>
          <Case condition={invitationStatus === "INVITED"}>{"Vous n'avez aucune invitation en attente."}</Case>
          <Case condition={invitationStatus === "REQUESTED"}>{"Vous n'avez aucune demande d'accès en cours."}</Case>
        </Conditional>
      </div>
    );
  } else
    return projets.map((collectiviteWithProjet) => {
      return (
        <div
          className="mb-8"
          key={collectiviteWithProjet.collectivite.id}
          id={collectiviteWithProjet.collectivite.code_insee || collectiviteWithProjet.collectivite.nom}
        >
          <h2 className="mb-4 text-[22px] font-bold leading-normal  text-pfmv-navy">
            <i className="ri-home-2-fill mr-2  before:!w-[20px]"></i>
            {collectiviteWithProjet.collectivite.nom}
          </h2>
          {collectiviteWithProjet.projets.map((projet) => (
            <ListeProjetsCard projet={projet} invitationStatus={invitationStatus} key={projet.id} />
          ))}
          <Conditional>
            <Case
              condition={
                invitationStatus === "ACCEPTED" && userCollectiviteId === collectiviteWithProjet.collectivite.id
              }
            >
              <div className="ml-auto w-fit rounded-[10px] !border-[1px] !border-pfmv-navy text-sm">
                <Button
                  iconId="ri-add-circle-fill"
                  priority="tertiary no outline"
                  onClick={() => setCollectiviteIdToListAvailableProjets(collectiviteWithProjet.collectivite.id)}
                  className="rounded-[10px]"
                >
                  Rejoindre {"d'autres"} projets
                </Button>
              </div>
            </Case>
          </Conditional>
        </div>
      );
    });
};
