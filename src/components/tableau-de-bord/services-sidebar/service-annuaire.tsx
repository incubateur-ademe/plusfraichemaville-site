"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import Image from "next/image";
import { useUserStore } from "@/src/stores/user/provider";
import clsx from "clsx";

export const ServiceAnnuaire = () => {
  const userInfos = useUserStore((state) => state.userInfos);
  const cardDisabled = !userInfos?.is_agent_public;

  return (
    <div
      className={clsx(
        "max-w-[21rem] p-6",
        cardDisabled ? "pfmv-flat-card bg-white" : "pfmv-card fr-enlarge-link group ",
      )}
    >
      <div className="flex items-start gap-4">
        <Image
          src={
            cardDisabled
              ? "/images/espace-projet/services/annuaire-disabled.svg"
              : "/images/espace-projet/services/annuaire.svg"
          }
          width={32}
          height={32}
          alt=""
          className="size-8"
        />
        <div>
          <h3 className={clsx(cardDisabled && "text-dsfr-text-disabled-grey")}>
            {cardDisabled ? (
              <>Carte des projets et des contacts</>
            ) : (
              <GenericFicheLink className="text-pfmv-navy" href={PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_MAP_CONTACT}>
                Carte des projets et des contacts
              </GenericFicheLink>
            )}
          </h3>
          <p className={clsx(cardDisabled ? "text-dsfr-text-disabled-grey" : "text-dsfr-text-default-grey")}>
            Uniquement disponible pour les collectivités.
          </p>
          {!cardDisabled && (
            <div
              className={clsx(
                "flex justify-between",
                cardDisabled
                  ? "text-dsfr-text-disabled-grey"
                  : " text-sm text-dsfr-text-default-grey group-hover:underline",
              )}
            >
              <span>Voir la carte</span>
              <i className="ri-arrow-right-line fr-icon--sm"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
