"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";
import { useParams } from "next/navigation";

export const TableauDeBordSuiviCardWithList = () => {
  const currentUser = useUserStore((state) => state.userInfos);

  // on récupère tout le state pour souscrire aux changements des projets
  // Les projets peuvent ne pas être chargés à l'arrivée sur cette page
  const { getProjetById } = useProjetsStore((state) => state);
  const { projetId } = useParams();
  const current = getProjetById(+projetId);

  return (
    <span className="text-sm">
      <strong>Espace:</strong> <span className="capitalize">{current?.type_espace}</span>
      <br />
      <strong>Référent:</strong> {currentUser?.name ?? "Christophe Roméro"} <br />
    </span>
  );
};
