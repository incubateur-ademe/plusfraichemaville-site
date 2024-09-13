import { makeFicheSolutionUrlApi } from "@/components/ficheSolution/helpers";
import { FicheSolutionResponse } from "@/components/ficheSolution/type";
import { nullFunctionalComponent } from "@/helpers/common";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { AideEstimationsCardLabel } from "./aide-estimations-card-label";

export const AideEstimationsCardLabelFicheSolution = ({ ficheId }: { ficheId: number }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(makeFicheSolutionUrlApi(ficheId));

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
