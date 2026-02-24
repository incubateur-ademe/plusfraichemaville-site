"use client";

import { FicheSolutionSmallCard } from "@/src/components/ficheSolution/fiche-solution-small-card";
import { Separator } from "@/src/components/common/separator";
import { AideEstimationsCardRecap } from "./aide-estimations-recap";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { useAidesByProjetFetcher } from "@/src/hooks/use-aides-by-projet-fetcher";
import { countAidesByType } from "../helpers";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";

type AideProjetFichesSolutionsProps = {
  projetId: number;
  ficheSolutionIds: number[];
};

export const AideProjetFichesSolutions = ({ projetId, ficheSolutionIds }: AideProjetFichesSolutionsProps) => {
  const { data: aides, isLoading } = useAidesByProjetFetcher(projetId);
  const countAides = countAidesByType(aides?.results ?? []);

  return (
    <div>
      <AideEstimationsListeHeader title="Retrouvez les aides financières et en ingénierie disponibles pour les solutions de votre projet" />
      <div className="mb-8 rounded-2xl border border-dsfr-border-default-grey p-6">
        <div className="mb-6 text-lg font-bold">Solutions du projet</div>
        <div className="mb-8 flex flex-wrap gap-6">
          {ficheSolutionIds.map((ficheSolutionId) => (
            <FicheSolutionSmallCard
              ficheSolutionId={ficheSolutionId}
              className="pointer-events-none w-52 shrink-0 rounded-2xl border-[1px] border-dsfr-border-default-grey"
              key={ficheSolutionId}
            />
          ))}
        </div>
        <Separator className="mb-6 h-px !opacity-100" />
        <AideEstimationsCardRecap isLoading={isLoading} countAides={{ ...countAides, verb: "trouvé" }}>
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_SELECTIONNER_AIDES(projetId)}
            className="fr-btn rounded-3xl"
          >
            Sélectionner des aides
          </GenericFicheLink>
        </AideEstimationsCardRecap>
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
