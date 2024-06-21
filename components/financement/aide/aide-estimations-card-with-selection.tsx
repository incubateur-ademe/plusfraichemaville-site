import { estimations_aides } from "@prisma/client";
import { AideEstimationsCardLabelFicheSolution } from "./aide-estimations-card-label-fiche-solution";
import { AideCard } from "./aide-card";
import { useProjetsStore } from "@/stores/projets/provider";
import { AideEstimationsCardLabel } from "./aide-estimations-card-label";
import { getRegionByDepartment } from "@/lib/departements";
import { TypeEspace, selectEspaceByCode } from "@/components/filters/TypeEspaceFilter";

type AideEstimationsCardWithSelectionProps = {
  fichesSolutionsId: number[];
  estimationsAides: estimations_aides[];
};

export const AideEstimationsCardWithSelection = ({
  fichesSolutionsId,
  estimationsAides,
}: AideEstimationsCardWithSelectionProps) => {
  const aidesId = estimationsAides.map(({ aideId }) => aideId);

  const espace = useProjetsStore((state) => state.getCurrentProjet()?.type_espace) as TypeEspace["code"];
  const collectivite = useProjetsStore((state) => state.getCurrentProjet()?.collectivite);
  const commune = `${collectivite?.code_postal} ${collectivite?.nom}`;
  const region = getRegionByDepartment(collectivite?.code_postal);

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-4">
        {fichesSolutionsId.map((ficheId) => (
          <AideEstimationsCardLabelFicheSolution ficheId={ficheId} key={ficheId} />
        ))}
      </div>
      <div className="mb-6 flex flex-wrap gap-4">
        <AideEstimationsCardLabel>Region {region}</AideEstimationsCardLabel>
        <AideEstimationsCardLabel>{commune}</AideEstimationsCardLabel>
        <AideEstimationsCardLabel>{selectEspaceByCode(espace)}</AideEstimationsCardLabel>
      </div>
      <div className="aide-card flex flex-wrap gap-6">
        {aidesId.map((aideId) => (
          <AideCard id={aideId} key={aideId} />
        ))}
      </div>
    </>
  );
};
