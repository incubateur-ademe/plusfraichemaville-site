"use client";
import { ListeProjetsCard } from "@/components/liste-projets/card";
import { ListeProjetsHeader } from "./header";
import { useProjetsStore } from "@/stores/projets/provider";
import { groupProjetsByCollectivite } from "./helpers";
import Image from "next/image";

export const ListProjets = () => {
  const projets = useProjetsStore((state) => state.projets);
  const projetsByTown = groupProjetsByCollectivite(projets);

  return (
    <div className="relative bg-dsfr-background-alt-blue-france">
      <Image
        src="/images/espace-projet/wave.svg"
        width={440}
        height={204}
        alt=""
        className="absolute right-0 top-0 z-0"
      />
      {
        <div className="fr-container relative z-10 min-h-[25rem] py-10">
          <ListeProjetsHeader isListEmpty={projets.length === 0} />
          {projetsByTown.map(([commune, projetsByCommune], index) => {
            return (
              <div className="mb-8" key={index} id={commune}>
                <h3 className="mb-4 text-[22px] font-bold text-pfmv-navy">
                  <i className="ri-map-pin-line mr-1 before:!w-[14px]"></i>
                  {commune}
                </h3>
                {projetsByCommune.length > 0 &&
                  projetsByCommune.map((projet, index) => <ListeProjetsCard projet={projet} key={index} />)}
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};
