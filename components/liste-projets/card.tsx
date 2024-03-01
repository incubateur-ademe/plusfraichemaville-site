import { ProjetWithNomCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { ListeProjetsCardDeleteModal } from "./card-delete-modal";
import Link from "next/link";
import { PictoEspaceSelector } from "../common/pictos";
import { PictoId } from "../common/pictos/picto-espace-selector";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";

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
    <div className={`pfmv-card p-5 pb-10 rounded-xl flex mb-5 relative ${disabledText}`}>
      <div className="mr-6">
        <PictoEspaceSelector pictoId={projet.type_espace as PictoId} withBackground />
      </div>
      <div>
        <Link href={`/espace-projet/${projet.id}/tableau-de-bord`}>
          <h3 className="text-xl text-dsfr-text-label-blue-france mb-1">{projet.nom}</h3>
          <h4 className="text-dsfr-text-label-blue-france mb-4 text-base">
            <i className="ri-map-pin-line before:!w-4 mr-1"></i>
            {projet.collectivite.nom}
          </h4>
        </Link>
        <div className="flex items-center">
          <Link
            // className="fr-btn fr-btn--secondary fr-btn--sm fr-btn fr-btn--icon-left rounded-3xl mr-4"
            className="fr-btn fr-btn fr-btn--sm fr-btn fr-btn--icon-left rounded-3xl mr-4"
            href={PFMV_ROUTES.TABLEAU_DE_BORD(projet.id)}
            style={{ ...disabledButton }}
          >
            Accéder au projet
          </Link>
          <ListeProjetsCardDeleteModal projetId={projet.id} projetNom={projet.nom} />
        </div>
      </div>
      <div
        className={clsx(
          "absolute top-5 right-5 text-sm",
          "before:inline-block before:w-[10px] before:h-[10px] before:mr-2",
          "before:bg-dsfr-background-action-high-success-hover before:rounded-full",
        )}
      >
        En cours
      </div>
    </div>
  );
};
