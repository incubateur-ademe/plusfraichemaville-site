"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";

import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";

import { FicheDiagnosticProjetListeAddButton } from "./fiche-diagnostic-projet-liste-add-button";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const FicheDiagnosticProjetListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const savedFichesDiagnostic = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.diagnostic });
  const canEditProjet = useCanEditProjet(projet?.id);

  return (
    <div>
      <div className="mb-10 flex flex-row flex-wrap gap-8">
        {savedFichesDiagnostic?.map((ficheDiagnostic, index) => (
          <FicheDiagnosticCardWithFetcher ficheDiagnosticId={ficheDiagnostic} key={index} />
        ))}
        {canEditProjet && (
          <div className="flex items-center">
            <FicheDiagnosticProjetListeAddButton />
          </div>
        )}
      </div>
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
    </div>
  );
};
