import { ListeProjetsCard } from "./card";
import { ProjetsByCollectivite } from "./helpers";

export const ListeProjetTab = ({ projets }: { projets: ProjetsByCollectivite[] }) => {
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
          <ListeProjetsCard projet={projet} key={index} />
        ))}
      </div>
    );
  });
};
