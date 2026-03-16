import { getRegionByDepartment } from "@/src/lib/departements";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Separator, SeparatorY } from "@/src/components/common/separator";
import { selectEspaceLabelByCode, TypeEspace } from "@/src/helpers/type-espace-filter";

export const AideProjetPanelHeader = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const espace = projet?.type_espace as TypeEspace["code"];
  const collectivite = projet?.collectivite;
  const commune = `${collectivite?.code_postal} ${collectivite?.nom}`;
  const region = getRegionByDepartment(collectivite?.code_postal);

  if (!projet) return null;

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4 text-xl font-bold text-pfmv-navy">
        <div>Région {region}</div>
        <SeparatorY />
        <div>{commune}</div>
        <SeparatorY />
        <div>{selectEspaceLabelByCode(espace)}</div>
      </div>
      <Separator className="mb-6 h-px !opacity-100" />
    </>
  );
};
