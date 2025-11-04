"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { RexContactId } from "@/src/components/annuaire/types";

export const AnnuaireTitle = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const inProgressProjetContacts = currentProjet?.sourcing_user_projets;
  const rexContactIds = currentProjet?.sourcing_rex as RexContactId[] | null;
  const nbContacts = (inProgressProjetContacts?.length || 0) + (rexContactIds?.length || 0);

  return (
    <div className="mb-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-6">
        <h2 className="mb-0 text-[1.75rem]">Carte des projets et des contacts</h2>
        {nbContacts > 0 && (
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_CONTACT}
            className=" fr-btn fr-btn--secondary ri-arrow-down-line fr-btn--icon-right rounded-3xl"
          >
            Voir mes contacts sauvegardés ({nbContacts})
          </GenericFicheLink>
        )}
      </div>
      <p className="max-w-[45rem]">
        Inspirez-vous des projets réalisés ou en cours pour identifier les contacts appropriés à votre projet et les
        sauvegarder.
      </p>
    </div>
  );
};
