"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";

export const TableauDeBordSuiviCardWithList = () => {
  const currentUser = useUserStore((state) => state.userInfos);
  const current = useProjetsStore((state) => state.getCurrentProjet());

  return (
    <span className="text-sm">
      <strong>Espace:</strong> <span className="capitalize">{current?.type_espace}</span>
      <br />
      <strong>Référent:</strong> {currentUser?.name ?? "Christophe Roméro"} <br />
    </span>
  );
};
