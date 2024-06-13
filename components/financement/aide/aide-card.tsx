import { AideFiche } from "./aide-fiche";
import { AideFicheModal } from "./aide-fiche-modal";
import { AidesTerritoiresAide, AidesTerritoiresAideType } from "../types";

type AideCardProps = {
  type: AidesTerritoiresAideType;
  aide: AidesTerritoiresAide;
};

export const AideCard = ({ type, aide }: AideCardProps) => {
  return (
    <AideFicheModal id={aide.id}>
      <AideFiche aide={aide} type={type} />
    </AideFicheModal>
  );
};
