"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { DisplayUserName } from "../common/display-user-name";

export const TableauDeBordSuiviCardWithList = () => {
  const current = useProjetsStore((state) => state.getCurrentProjet());

  return (
    <span className="text-sm">
      <strong>Espace:</strong> <span className="capitalize">{current?.type_espace}</span>
      <br />
      <strong>Référent:</strong>
      <DisplayUserName user={current?.creator} />
      <br />
    </span>
  );
};
