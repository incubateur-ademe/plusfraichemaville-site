"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { FichesDiagnosticProjetEmpty } from "./fiche-diagnostic-projet-empty";

import { FicheDiagnosticCardWithFetcher } from "./fiche-diagnostic-card-with-fetcher";

import { FicheDiagnosticProjetListeAddButton } from "./fiche-diagnostic-projet-liste-add-button";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useUserStore } from "@/src/stores/user/provider";

export const FicheDiagnosticProjetListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const userId = useUserStore((state) => state.userInfos?.id);
  const isCurrentUserAdmin = useProjetsStore((state) => state.isCurrentUserAdmin(userId));
  const savedFichesDiagnostic = projet?.fiches_diagnostic_id;

  return (
    <div>
      <div className="mb-10 flex flex-row flex-wrap gap-8">
        {savedFichesDiagnostic?.length === 0 && <FichesDiagnosticProjetEmpty />}
        {savedFichesDiagnostic?.map((ficheDiagnostic, index) => (
          <FicheDiagnosticCardWithFetcher ficheDiagnosticId={ficheDiagnostic} key={index} />
        ))}
        {isCurrentUserAdmin && (
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
