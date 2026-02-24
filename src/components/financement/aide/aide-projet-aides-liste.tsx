"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideProjetPanelHeader } from "./aide-projet-panel-header";
import { AideCardWithFetcher } from "./aide-card-with-fetcher";
import { AideEstimationsCardRecap } from "./aide-estimations-recap";
import { AideEstimationsCardDeadline } from "./aide-estimations-card-deadline";
import { countAidesByTypeFromDB, sumbissionDateSortBase } from "../helpers";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { Separator } from "@/src/components/common/separator";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

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
      <AideEstimationsListeHeader
        title="Sélectionnez les financements et soutiens à l'ingénierie pour lesquels
      vous souhaitez envoyer une candidature"
      />
      <div className="pfmv-card no-shadow relative mb-8 w-full p-8 hover:outline-none">
        <h2 className="mb-1 text-[22px] text-pfmv-navy">Aides sélectionnées pour le projet</h2>
        <span className="mb-6 block text-black">Solutions pour lesquelles vous recherchez des financements</span>
        <Separator className="mb-4 h-px !opacity-100" />
        <AideProjetPanelHeader />
        <div className="aide-card mb-9 flex flex-wrap gap-6">
          {aidesId.map((aideId) => (
            <AideCardWithFetcher aideId={aideId} key={aideId} />
          ))}
        </div>
        <AideEstimationsCardRecap
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
        </AideEstimationsCardRecap>
        {hasSubmissionDeadline && (
          <AideEstimationsCardDeadline estimationsAides={projetAides} ariaId={`projet-${projet?.id}`} />
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
