"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { DisplayUserName } from "../common/display-user-name";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";

export const TableauDeBordSuiviCardInfoProjet = () => {
  const current = useProjetsStore((state) => state.getCurrentProjet());

  return (
    <span className="text-sm">
      <strong>Espace :</strong> <span className="capitalize">{selectEspaceLabelByCode(current?.type_espace)}</span>
      <br />
      <strong>Référent :</strong>
      <DisplayUserName user={current?.creator} />
      <br />
    </span>
  );
};
