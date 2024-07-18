import { InvitationStatus } from "@prisma/client";
import { ListeProjetsCard } from "./card";
import { ProjetsByCollectivite } from "./helpers";

import { ListProjetsHeaderEmpty } from "./empty";

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
        <ListProjetsHeaderEmpty />
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
          {collectiviteWithProjet.projets.map((projet, index) => (
            <ListeProjetsCard projet={projet} invitationStatus={invitationStatus} key={index} />
          ))}
        </div>
      );
    });
};
