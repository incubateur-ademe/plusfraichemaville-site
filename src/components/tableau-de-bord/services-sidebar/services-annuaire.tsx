import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import Image from "next/image";

export const ServicesAnnuaire = () => {
  return (
    <div className="pfmv-card fr-enlarge-link group max-w-[21rem] p-6">
      <div className="flex items-start gap-4">
        <Image src="/images/espace-projet/services/carte.svg" width={32} height={32} alt="" className="size-8" />
        <div>
          <h3>
            <GenericFicheLink className="text-pfmv-navy" href={PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_MAP}>
              Carte des projets et des contacts
            </GenericFicheLink>
          </h3>
          <p className="text-dsfr-text-default-grey">
            Trouvez des contacts liés aux projets réalisés : bureaux d’études, AMO, agents de collectivités.
          </p>
          <div className="flex justify-between text-sm text-dsfr-text-default-grey group-hover:underline">
            <span>Voir la carte</span>
            <i className="ri-arrow-right-line fr-icon--sm"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
