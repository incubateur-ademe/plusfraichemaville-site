import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { ListeProjetsCardDeleteModal } from "./card-delete-modal";
import Link from "next/link";
import { PictoEspaceSelector } from "../common/pictos";
import { PictoId } from "../common/pictos/picto-espace-selector";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";

type ListeProjetsCardProps = {
  disabled?: boolean;
  projet: ProjetWithRelations;
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
    <div className="relative">
      <Link href={PFMV_ROUTES.TABLEAU_DE_BORD(projet.id)}>
        <div className={`pfmv-card relative mb-5 flex rounded-xl p-5 pb-16 ${disabledText}`}>
          <div className="mr-6">
            <PictoEspaceSelector
              pictoId={projet.type_espace as PictoId}
              withBackground
              size="medium"
              pictoClassName="svg-blue"
            />
          </div>
          <div>
            <h3 className="mb-1 mt-2 text-xl text-dsfr-text-label-blue-france">{projet.nom}</h3>
            <h4 className="mb-4 text-base text-dsfr-text-label-blue-france">
              <i className="ri-map-pin-line mr-1 before:!w-4"></i>
              {projet.collectivite.nom}
            </h4>
          </div>
          <div
            className={clsx(
              "absolute right-5 top-5 text-sm",
              "before:mr-2 before:inline-block before:h-[10px] before:w-[10px]",
              "before:rounded-full before:bg-dsfr-background-action-high-success-hover",
            )}
          >
            En cours
          </div>
        </div>
      </Link>
      <div className="absolute bottom-6 left-32 flex h-8 items-center">
        <Link
          className="fr-btn fr-btn--sm fr-btn fr-btn--icon-left mr-4 rounded-3xl"
          href={PFMV_ROUTES.TABLEAU_DE_BORD(projet.id)}
          style={{ ...disabledButton }}
        >
          Accéder au projet
        </Link>
        <ListeProjetsCardDeleteModal projetId={projet.id} projetNom={projet.nom} />
      </div>
    </div>
  );
};
