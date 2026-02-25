"use client";

import { FicheSolutionSmallCard } from "@/src/components/ficheSolution/fiche-solution-small-card";
import { Separator } from "@/src/components/common/separator";
import { AideProjetListeHeader } from "./aide-projet-liste-header";
import { useAidesByProjetFetcher } from "@/src/hooks/use-aides-by-projet-fetcher";
import { countAidesByType } from "../helpers";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { AideProjetRecap } from "./aide-projet-recap";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { isEmpty } from "@/src/helpers/listUtils";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const ProjetNoAideOverviewCard = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const ficheSolutionIds = getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution }) ?? [];
  const { data: aides, isLoading } = useAidesByProjetFetcher(currentProjet?.id, ficheSolutionIds);
  const countAides = countAidesByType(aides?.results ?? []);

  if (!currentProjet) return null;

  return (
    <div>
      <AideProjetListeHeader
        title="Retrouvez les aides financières et en ingénierie disponibles pour les
       solutions de votre projet"
      />
      <div className="mb-8 rounded-2xl border border-dsfr-border-default-grey p-6">
        <div className="mb-6 text-lg font-bold">Solutions du projet</div>
        {isEmpty(ficheSolutionIds) ? (
          <div className="mb-8 flex items-center justify-between gap-4 rounded-xl bg-dsfr-background-contrast-info p-4">
            <p className="text-dsfr-text-default-info m-0 text-base">
              Pour voir des aides plus pertinentes, sélectionnez des solutions dans votre projet
            </p>
            <LinkWithoutPrefetch
              href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(currentProjet.id)}
              className="fr-btn fr-btn--secondary shrink-0 rounded-3xl"
            >
              Ajouter des solutions
            </LinkWithoutPrefetch>
          </div>
        ) : (
          <div className="mb-8 flex flex-wrap gap-6">
            {ficheSolutionIds.map((ficheSolutionId) => (
              <FicheSolutionSmallCard
                ficheSolutionId={ficheSolutionId}
                className="pointer-events-none w-52 shrink-0 rounded-2xl border-[1px] border-dsfr-border-default-grey"
                key={ficheSolutionId}
              />
            ))}
          </div>
        )}
        <Separator className="mb-6 h-px !opacity-100" />
        <AideProjetRecap isLoading={isLoading} countAides={{ ...countAides, verb: "trouvé" }}>
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_SELECTIONNER_AIDES(currentProjet.id)}
            className="fr-btn rounded-3xl"
          >
            Sélectionner des aides
          </GenericFicheLink>
        </AideProjetRecap>
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
