import { TypeEspace, selectEspaceByCode } from "@/components/filters/TypeEspaceFilter";
import { AideEstimationsCardLabel } from "./aide-estimations-card-label";
import { AideEstimationsCardLabelFicheSolution } from "./aide-estimations-card-label-fiche-solution";
import { getRegionByDepartment } from "@/lib/departements";
import { useProjetsStore } from "@/stores/projets/provider";

export const AideEstimationsPanelHeader = () => {
  const fichesSolutionsId = useProjetsStore((state) => state.getCurrentProjet()?.fiches_solutions_id);
  const espace = useProjetsStore((state) => state.getCurrentProjet()?.type_espace) as TypeEspace["code"];
  const collectivite = useProjetsStore((state) => state.getCurrentProjet()?.collectivite);
  const commune = `${collectivite?.code_postal} ${collectivite?.nom}`;
  const region = getRegionByDepartment(collectivite?.code_postal);

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-4">
        {fichesSolutionsId?.map((ficheId) => <AideEstimationsCardLabelFicheSolution ficheId={ficheId} key={ficheId} />)}
      </div>
      <div className="mb-6 flex flex-wrap gap-4">
        <AideEstimationsCardLabel>Region {region}</AideEstimationsCardLabel>
        <AideEstimationsCardLabel>{commune}</AideEstimationsCardLabel>
        <AideEstimationsCardLabel>{selectEspaceByCode(espace)}</AideEstimationsCardLabel>
      </div>
    </>
  );
};
