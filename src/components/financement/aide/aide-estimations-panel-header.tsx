import { AideEstimationsCardLabelFicheSolution } from "./aide-estimations-card-label-fiche-solution";
import { getRegionByDepartment } from "@/src/lib/departements";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Separator, SeparatorY } from "@/src/components/common/separator";
import { estimation } from "@/src/generated/prisma/client";
import { TypeEspace } from "@/src/helpers/type-espace-filter";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";

export const AideEstimationsPanelHeader = ({ estimation }: { estimation?: estimation }) => {
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
        {estimation?.fiches_solutions_id?.map((ficheId) => (
          <AideEstimationsCardLabelFicheSolution ficheId={ficheId} key={ficheId} />
        ))}
      </div>
      <Separator className="mb-6 h-px !opacity-100" />
    </>
  );
};
