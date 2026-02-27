"use client";
import { makeFicheSolutionUrlApi } from "@/src/components/ficheSolution/helpers";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { AideProjetCardLabel } from "./aide-projet-card-label";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const AideProjetCardLabelFicheSolution = ({ ficheId }: { ficheId: number }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(makeFicheSolutionUrlApi(ficheId));

  const ficheSolution = data && data[0];
  const iconTypeSolution =
    getTypeSolutionFromCode(ficheSolution?.attributes.type_solution)?.coloredIcon("fr-icon--sm mr-1") ?? null;

  return (
    <div className="shrink-0 text-black">
      <AideProjetCardLabel isLoading={isLoading}>
        <div className="flex items-center justify-center gap-1">
          {<>{iconTypeSolution}</>}
          {ficheSolution?.attributes.titre}
        </div>
      </AideProjetCardLabel>
    </div>
  );
};
