"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { FichesDiagnosticProjetEmpty } from "./fiche-diagnostic-projet-empty";

import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";

import { FicheDiagnosticProjetListeAddButton } from "./fiche-diagnostic-projet-liste-add-button";

import { FicheDiagnosticLink } from "./fiche-diagnostic-link";
import { PFMV_ROUTES } from "@/helpers/routes";

export const FicheDiagnosticProjetListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const savedFichesDiagnostic = projet?.fiches_diagnostic_id;

  return (
    <div>
      <div className="mb-10 flex flex-row flex-wrap gap-8">
        {savedFichesDiagnostic?.length === 0 && <FichesDiagnosticProjetEmpty />}
        {savedFichesDiagnostic?.map((ficheDiagnostic, index) => (
          <FicheDiagnosticCardWithFetcher ficheDiagnosticId={ficheDiagnostic} key={index} />
        ))}
        <div className="flex items-center">
          <FicheDiagnosticProjetListeAddButton />
        </div>
      </div>
      <FicheDiagnosticLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Aller au tableau de bord
      </FicheDiagnosticLink>
    </div>
  );
};
