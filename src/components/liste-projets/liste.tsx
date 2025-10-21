import { InvitationStatus } from "@/src/generated/prisma/client";
import { ProjetsByCollectivite } from "./helpers";

import { ListProjetsHeaderEmpty } from "./empty";
import { Case, Conditional } from "../common/conditional-renderer";
import { ProjetCard } from "@/src/components/liste-projets/projet-card";

export const ListeProjetTab = ({
  projets,
  invitationStatus,
}: {
  projets: ProjetsByCollectivite[];
  invitationStatus: InvitationStatus;
}) => {
  if (!projets.length) {
    return (
      <div className="w-full">
        <Conditional>
          <Case condition={invitationStatus === InvitationStatus.ACCEPTED}>
            <ListProjetsHeaderEmpty />
          </Case>
          <Case condition={invitationStatus === InvitationStatus.INVITED}>
            {"Vous n'avez aucune invitation en attente."}
          </Case>
          <Case condition={invitationStatus === InvitationStatus.REQUESTED}>
            {"Vous n'avez aucune demande d'accès en cours."}
          </Case>
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
            <i className="ri-home-4-fill mr-2  before:!w-[20px]"></i>
            {collectiviteWithProjet.collectivite.nom}
          </h2>
          <ul>
            {collectiviteWithProjet.projets.map((projet) => (
              <li key={projet.id} className="mb-5">
                <ProjetCard projet={projet} invitationStatus={invitationStatus} />
              </li>
            ))}
          </ul>
        </div>
      );
    });
};
