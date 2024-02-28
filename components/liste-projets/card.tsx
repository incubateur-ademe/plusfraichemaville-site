import { PictoEspaceSelector } from "../common/pictos";

import { ProjetWithNomCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { ListeProjetsCardDeleteModal } from "./card-delete-modal";
import Link from "next/link";

type ListeProjetsCardProps = {
  disabled?: boolean;
  projet: ProjetWithNomCollectivite;
};

export const ListeProjetsCard = ({ projet, disabled }: ListeProjetsCardProps) => {
  const disabledText = disabled && "[&>*>*]:text-dsfr-text-disabled-grey pointer-events-none";
  const disabledButton = disabled && {
    color: "var(--grey-625-425)",
    border: "solid 1px var(--grey-625-425) !important",
    background: "none",
    boxShadow: "none",
  };

  return (
    <div className={`pfmv-card p-5 pb-10 rounded-xl flex mb-5 ${disabledText}`}>
      <div className="mr-6">
        <PictoEspaceSelector pictoId="place" withBackground />
      </div>
      <div>
        <h3 className="text-xl text-dsfr-text-label-blue-france mb-1">{projet.nom}</h3>
        <h4 className="text-dsfr-text-label-blue-france mb-4 text-base">
          <i className="ri-map-pin-line before:!w-4 mr-1"></i>
          {projet.collectivite.nom}
        </h4>
        <div className="flex items-center">
          <Link
            href={`/espace-projet/${projet.id}/tableau-de-bord`}
            className="fr-btn fr-btn--sm fr-btn fr-btn--icon-left rounded-3xl mr-4"
            style={{ ...disabledButton }}
          >
            Accéder au projet
          </Link>
          <ListeProjetsCardDeleteModal projetId={projet.id} projetNom={projet.nom} createdBy={projet.created_by} />
        </div>
      </div>
    </div>
  );
};
