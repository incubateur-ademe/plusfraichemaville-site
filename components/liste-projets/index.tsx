"use client";
import { ListeProjetsCard } from "@/components/liste-projets/card";
import { ListeProjetsHeader } from "./header";
import { useProjetsStore } from "@/stores/projets/provider";

export const ListProjets = () => {
  const projets = useProjetsStore((state) => state.projets);

  return (
    <div className="bg-dsfr-background-alt-blue-france">
      <div className="fr-container py-10 min-h-[25rem]">
        <ListeProjetsHeader isListEmpty={projets.length === 0} />
        {projets.length > 0 && projets.map((projet, index) => <ListeProjetsCard projet={projet} key={index} />)}
      </div>
    </div>
  );
};
