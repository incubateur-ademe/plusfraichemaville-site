import { estimations_aides } from "@prisma/client";
import { AideEstimationsCardLabelFicheSolution } from "./aide-estimations-card-label-fiche-solution";
import { AideCard } from "./aide-card";

type AideEstimationsCardWithSelectionProps = {
  fichesSolutionsId: number[];
  estimationsAides: estimations_aides[];
};
// const { data } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(makeFicheSolutionUrlApi(ficheSolutionId));

export const AideEstimationsCardWithSelection = ({
  fichesSolutionsId,
  estimationsAides,
}: AideEstimationsCardWithSelectionProps) => {
  const aidesId = estimationsAides.map(({ aideId }) => aideId);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-4">
        {fichesSolutionsId.map((ficheId) => (
          <AideEstimationsCardLabelFicheSolution ficheId={ficheId} key={ficheId} />
        ))}
      </div>
      <div className="aide-card">
        {aidesId.map((aideId) => (
          <AideCard id={aideId} key={aideId} />
        ))}
      </div>
    </>
  );
};
