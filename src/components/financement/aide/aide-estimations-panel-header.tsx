import { AideEstimationsCardLabelFicheSolution } from "./aide-estimations-card-label-fiche-solution";
import { getRegionByDepartment } from "@/src/lib/departements";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Separator, SeparatorY } from "@/src/components/common/separator";
import { EstimationWithAidesDto } from "@/src/types/dto";
import { TypeEspace } from "@/src/helpers/type-espace-filter";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";

export const AideEstimationsPanelHeader = ({ estimation }: { estimation?: EstimationWithAidesDto }) => {
  const espace = useProjetsStore((state) => state.getCurrentProjet()?.typeEspace) as TypeEspace["code"];
  const collectivite = useProjetsStore((state) => state.getCurrentProjet()?.collectivite);
  const commune = `${collectivite?.codePostal} ${collectivite?.nom}`;
  const region = getRegionByDepartment(collectivite?.codePostal);

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4 text-xl font-bold text-pfmv-navy">
        <div>Région {region}</div>
        <SeparatorY />
        <div>{commune}</div>
        <SeparatorY />
        <div>{selectEspaceLabelByCode(espace)}</div>
      </div>
      <div className="mb-6 flex min-h-7 flex-wrap gap-4">
        {estimation?.estimationsFichesSolutions?.map((efs) => (
          <AideEstimationsCardLabelFicheSolution ficheId={efs.ficheSolutionId} key={efs.ficheSolutionId} />
        ))}
      </div>
      <Separator className="mb-6 h-px !opacity-100" />
    </>
  );
};
