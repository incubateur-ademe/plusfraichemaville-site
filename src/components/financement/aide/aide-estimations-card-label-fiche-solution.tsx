import { makeFicheSolutionUrlApi } from "@/src/components/ficheSolution/helpers";
import { nullFunctionalComponent } from "@/src/helpers/common";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { AideEstimationsCardLabel } from "./aide-estimations-card-label";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const AideEstimationsCardLabelFicheSolution = ({ ficheId }: { ficheId: number }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(makeFicheSolutionUrlApi(ficheId));

  const ficheSolution = data && data[0];
  const Icon = getTypeSolutionFromCode(ficheSolution?.attributes.type_solution)?.coloredIcon ?? nullFunctionalComponent;

  return (
    <div className="shrink-0">
      <AideEstimationsCardLabel isLoading={isLoading}>
        <div className="flex items-center justify-center gap-1">
          {
            <i className="[&>i]:!inline-block [&>i]:!size-4 [&>i]:before:!size-4 [&>i]:before:!align-[-3px]">
              <Icon />
            </i>
          }
          {ficheSolution?.attributes.titre}
        </div>
      </AideEstimationsCardLabel>
    </div>
  );
};
