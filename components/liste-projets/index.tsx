"use client";
import { ListeProjetsCard } from "@/components/liste-projets/card";
import { ListeProjetsHeader } from "./header";
import { useProjetsStore } from "@/stores/projets/provider";
import Image from "next/image";

export const ListProjets = () => {
  const projets = useProjetsStore((state) => state.projets);

  return (
    <div className="bg-dsfr-background-alt-blue-france relative">
      <Image
        src="/images/espace-projet/wave.svg"
        width={440}
        height={204}
        alt=""
        className="absolute top-0 right-0 z-0"
      />
      <div className="fr-container py-10 min-h-[25rem] z-10 relative">
        <ListeProjetsHeader isListEmpty={projets.length === 0} />
        {projets.length > 0 && projets.map((projet, index) => <ListeProjetsCard projet={projet} key={index} />)}
      </div>
    </div>
  );
};
