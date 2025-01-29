"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { FichesDiagnosticProjetEmpty } from "./fiche-diagnostic-no-selection";

import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";

import { FicheDiagnosticProjetListeAddButton } from "./fiche-diagnostic-projet-liste-add-button";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

export const FicheDiagnosticProjetListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);
  const savedFichesDiagnostic = projet?.fiches_diagnostic_id;

  return (
    <div>
      <div className="mb-10 flex flex-row flex-wrap gap-8">
        {savedFichesDiagnostic?.length === 0 && <FichesDiagnosticProjetEmpty />}
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
