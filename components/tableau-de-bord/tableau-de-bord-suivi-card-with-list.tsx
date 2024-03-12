"use client";

import { useProjetsStore } from "@/stores/projets/provider";

export const TableauDeBordSuiviCardWithList = () => {
  const current = useProjetsStore((state) => state.getCurrentProjet());

  return (
    <span className="text-sm">
      <strong>Espace:</strong> <span className="capitalize">{current?.type_espace}</span>
      <br />
      <strong>Référent:</strong> {current?.created_by ?? "Christophe Roméro"} <br />
    </span>
  );
};
