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
      <div className="flex items-center gap-8 mb-10">
        {savedFichesDiagnostic?.length === 0 && <FichesDiagnosticProjetEmpty />}
        <div>
          {savedFichesDiagnostic?.map((ficheDiagnostic, index) => (
            <FicheDiagnosticCardWithFetcher ficheDiagnosticId={ficheDiagnostic} key={index} />
          ))}
        </div>
        <div>
          <FicheDiagnosticProjetListeAddButton />
        </div>
      </div>
      <FicheDiagnosticLink href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD} className="fr-btn rounded-3xl">
        Aller au tableau de bord
      </FicheDiagnosticLink>
    </div>
  );
};
