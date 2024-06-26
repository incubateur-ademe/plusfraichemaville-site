"use client";
import { ListeProjetsCard } from "@/components/liste-projets/card";
import { ListeProjetsHeader } from "./header";
import { useProjetsStore } from "@/stores/projets/provider";
import { groupProjetsByCollectivite } from "./helpers";
import Image from "next/image";
import orderBy from "lodash/orderBy";

export const ListProjets = () => {
  const projets = useProjetsStore((state) => state.projets);
  const projetsByCollectivite = groupProjetsByCollectivite(projets);
  const sortedProjetsByCollectivite = orderBy(projetsByCollectivite, ["collectivite.nom"], "asc");

  return (
    <div className="relative bg-dsfr-background-alt-blue-france">
      <Image
        src="/images/espace-projet/wave.svg"
        width={440}
        height={204}
        alt=""
        className="absolute right-0 top-0 z-0"
      />
      <div className="fr-container relative z-10 min-h-[25rem] py-10">
        <ListeProjetsHeader isListEmpty={projets.length === 0} />
        {sortedProjetsByCollectivite.map((collectiviteWithProjet) => {
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
        })}
      </div>
    </div>
  );
};
