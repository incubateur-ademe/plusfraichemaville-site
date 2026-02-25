"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { AideProjetListeHeader } from "./aide-projet-liste-header";
import { AideCardWithFetcher } from "./aide-card-with-fetcher";
import { AideProjetCardDeadline } from "./aide-projet-card-deadline";
import { countAidesByTypeFromDB, sumbissionDateSortBase } from "../helpers";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { AideProjetRecap } from "./aide-projet-recap";

export const AideProjetAidesListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);
  const projetAides = projet?.projetAides ?? [];
  const sortedProjetAides = [...projetAides].sort(sumbissionDateSortBase);
  const aidesId = sortedProjetAides.map(({ aideId }) => aideId);
  const aidesTerritoires = projetAides.map((pa) => pa.aide);
  const { aideFinanciereCount, aideTechniqueCount } = countAidesByTypeFromDB(aidesTerritoires);
  const hasSubmissionDeadline = projetAides.some((pa) => pa.aide.submission_deadline) && projetAides.length > 0;

  return (
    <div>
      <AideProjetListeHeader
        title="Sélectionnez les financements et soutiens à l'ingénierie pour lesquels
      vous souhaitez envoyer une candidature"
      />
      <div className="pfmv-card no-shadow relative mb-8 w-full p-8 hover:outline-none">
        <h2 className="mb-6 text-[22px] text-pfmv-navy">Aides sélectionnées pour le projet</h2>
        <div className="aide-card mb-9 flex flex-wrap gap-6">
          {aidesId.map((aideId) => (
            <AideCardWithFetcher aideId={aideId} key={aideId} />
          ))}
        </div>
        <AideProjetRecap
          isLoading={false}
          countAides={{ aideFinanciereCount, aideTechniqueCount, verb: "sélectionné" }}
        >
          {canEditProjet && (
            <LinkWithoutPrefetch
              className="fr-btn !ml-auto !block rounded-3xl"
              href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_SELECTIONNER_AIDES(projet?.id ?? 0)}
            >
              Modifier
            </LinkWithoutPrefetch>
          )}
        </AideProjetRecap>
        {hasSubmissionDeadline && <AideProjetCardDeadline aides={projetAides} ariaId={`projet-${projet?.id}`} />}
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
