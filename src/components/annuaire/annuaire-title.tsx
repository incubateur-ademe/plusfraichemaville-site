"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { isEmpty } from "@/src/helpers/listUtils";

export const AnnuaireTitle = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const inProgressProjetContacts = currentProjet?.sourcing_user_projets;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
      <h2 className="mb-0 text-[1.75rem]">Je sélectionne des prestataires et des partenaires</h2>
      {!isEmpty(inProgressProjetContacts) && (
        <GenericFicheLink
          href={PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_CONTACT}
          className=" fr-btn fr-btn--secondary ri-arrow-down-line fr-btn--icon-right rounded-3xl"
        >
          Voir mes contacts sauvegardés
        </GenericFicheLink>
      )}
    </div>
  );
};
