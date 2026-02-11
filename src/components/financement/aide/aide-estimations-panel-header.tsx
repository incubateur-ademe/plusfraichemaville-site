import { AideEstimationsCardLabelFicheSolution } from "./aide-estimations-card-label-fiche-solution";
import { getRegionByDepartment } from "@/src/lib/departements";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Separator, SeparatorY } from "@/src/components/common/separator";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { TypeEspace } from "@/src/helpers/type-espace-filter";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";

export const AideEstimationsPanelHeader = ({ estimation }: { estimation?: EstimationWithAides }) => {
  const espace = useProjetsStore((state) => state.getCurrentProjet()?.type_espace) as TypeEspace["code"];
  const collectivite = useProjetsStore((state) => state.getCurrentProjet()?.collectivite);
  const commune = `${collectivite?.code_postal} ${collectivite?.nom}`;
  const region = getRegionByDepartment(collectivite?.code_postal);

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
        {estimation?.estimations_fiches_solutions?.map((efs) => (
          <AideEstimationsCardLabelFicheSolution ficheId={efs.fiche_solution_id} key={efs.fiche_solution_id} />
        ))}
      </div>
      <Separator className="mb-6 h-px !opacity-100" />
    </>
  );
};
