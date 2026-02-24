import { AideEstimationsCardLabelFicheSolution } from "./aide-estimations-card-label-fiche-solution";
import { getRegionByDepartment } from "@/src/lib/departements";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Separator, SeparatorY } from "@/src/components/common/separator";
import { TypeEspace } from "@/src/helpers/type-espace-filter";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const AideProjetPanelHeader = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const espace = projet?.type_espace as TypeEspace["code"];
  const collectivite = projet?.collectivite;
  const commune = `${collectivite?.code_postal} ${collectivite?.nom}`;
  const region = getRegionByDepartment(collectivite?.code_postal);
  const ficheSolutionIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution }) ?? [];

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
        {ficheSolutionIds.map((ficheId) => (
          <AideEstimationsCardLabelFicheSolution ficheId={ficheId} key={ficheId} />
        ))}
      </div>
      <Separator className="mb-6 h-px !opacity-100" />
    </>
  );
};
