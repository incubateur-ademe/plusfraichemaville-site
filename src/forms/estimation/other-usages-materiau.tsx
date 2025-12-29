import React, { useMemo } from "react";
import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { EstimationMateriauxFormData } from "@/src/forms/estimation/estimation-materiau-form-schema";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import { constructPluralString } from "@/src/helpers/common";

interface OtherUsagesMateriauProps {
  materiauId: number;
  estimationsFichesSolutions?: EstimationFicheSolution[];
  ficheSolution: FicheSolution;
  watchAllFields: EstimationMateriauxFormData;
  materiau: Materiau | undefined;
}

export default function OtherUsagesMateriau({
  materiauId,
  materiau,
  estimationsFichesSolutions,
  ficheSolution,
  watchAllFields,
}: OtherUsagesMateriauProps) {
  const allFicheSolutionIds = useMemo(
    () => estimationsFichesSolutions?.map((efs) => +efs.fiche_solution_id) || [],
    [estimationsFichesSolutions],
  );

  const { data: allFichesSolutions, isLoading: isFichesSolutionsLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(
    allFicheSolutionIds.length > 0 ? makeFicheSolutionCompleteUrlApi(allFicheSolutionIds) : null,
  );

  const solutionTitles = useMemo(
    () =>
      allFichesSolutions?.reduce((acc, fs) => ({ ...acc, [fs.id]: fs.attributes.titre }), {} as Record<number, string>),
    [allFichesSolutions],
  );

  const otherUsages =
    estimationsFichesSolutions?.filter(
      (efs) =>
        +efs.fiche_solution_id !== +ficheSolution.id &&
        efs.estimation_materiaux.some((em) => em.materiau_id === materiauId),
    ) || [];

  const uniteCoutMateriau = getUniteCoutFromCode(materiau?.attributes.cout_unite);

  const currentQuantity = watchAllFields.estimationMateriaux.find((f) => f.materiauId === materiauId)?.quantite || 0;
  const otherQuantity = otherUsages.reduce((acc, efs) => {
    const em = efs.estimation_materiaux.find(
      (m) => m.materiau_id === materiauId && +efs.fiche_solution_id !== +ficheSolution.id,
    );
    return acc + (em?.quantite || 0);
  }, 0);
  const totalQuantity = currentQuantity + otherQuantity;

  if (otherUsages.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 items-center gap-1 text-sm text-dsfr-text-mention-grey">
      <div className="text-nowrap">
        {`Utilisé dans ${constructPluralString(otherUsages.length, "autre solution", "autres solutions")} `}
        <Tooltip
          kind="hover"
          title={
            isFichesSolutionsLoading ? (
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
      </div>
      <div className="mt-1 text-sm font-bold">
        Quantité totale :{" "}
        {constructPluralString(totalQuantity, uniteCoutMateriau.unitLabel, uniteCoutMateriau.unitLabelPlural)}
      </div>
    </div>
  );
}
