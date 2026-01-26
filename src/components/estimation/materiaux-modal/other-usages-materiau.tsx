import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";
import { constructPluralString } from "@/src/helpers/common";
import { useFichesSolutionsTitles } from "@/src/hooks/use-fiches-solutions-titles";
import clsx from "clsx";

interface OtherUsagesMateriauProps {
  materiauId: number;
  ficheSolutionId: number;
  currentMateriauQuantity?: number;
  allEstimationsFichesSolutions: EstimationFicheSolution[];
  materiau: Materiau | undefined;
  showQuantity?: boolean;
  className?: string;
}

export default function OtherUsagesMateriau({
  materiauId,
  ficheSolutionId,
  currentMateriauQuantity = 0,
  materiau,
  allEstimationsFichesSolutions,
  showQuantity = true,
  className,
}: OtherUsagesMateriauProps) {
  const { solutionTitles, isFichesSolutionsTitlesLoading } = useFichesSolutionsTitles(allEstimationsFichesSolutions);

  const otherUsages =
    allEstimationsFichesSolutions?.filter(
      (efs) =>
        +efs.fiche_solution_id !== +ficheSolutionId &&
        efs.estimation_materiaux.some((em) => +em.materiau_id === +materiauId),
    ) || [];

  const uniteCoutMateriau = getUniteCoutFromCode(materiau?.attributes.cout_unite);

  const otherQuantity = otherUsages.reduce((acc, efs) => {
    const em = efs.estimation_materiaux.find(
      (m) => +m.materiau_id === +materiauId && +efs.fiche_solution_id !== +ficheSolutionId,
    );
    return acc + (em?.quantite || 0);
  }, 0);
  const totalQuantity = currentMateriauQuantity + otherQuantity;

  if (otherUsages.length === 0) {
    return null;
  }

  return (
    <div className={clsx("gap-1 text-sm text-dsfr-text-mention-grey", className)}>
      {`Utilisé dans ${constructPluralString(otherUsages.length, "autre", "autres")} `}
      <span className="text-nowrap">
        {constructPluralString(otherUsages.length, "solution ", "solutions ", false)}
        <Tooltip
          kind="hover"
          title={
            isFichesSolutionsTitlesLoading ? (
              <div className="min-w-36">
                <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-dsfr-contrast-grey" />
              </div>
            ) : (
              <ul>
                {otherUsages.map((u) => (
                  <li key={u.id}>{solutionTitles?.[u.fiche_solution_id]}</li>
                ))}
              </ul>
            )
          }
        >
          <i className="fr-icon-information-line fr-icon--sm" aria-hidden="true"></i>
        </Tooltip>
      </span>
      {showQuantity && (
        <div className="mt-1 text-sm font-bold">
          Quantité totale :{" "}
          {constructPluralString(totalQuantity, uniteCoutMateriau.unitLabel, uniteCoutMateriau.unitLabelPlural)}
        </div>
      )}
    </div>
  );
}
