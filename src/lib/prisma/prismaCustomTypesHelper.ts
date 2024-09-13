import { MateriauResponse } from "@/components/ficheSolution/type";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";

export const mapStrapiEstimationMateriauxToFormValues = (
  ficheSolutionMateriaux: MateriauResponse[] | undefined,
  defaultEstimationMateriaux: EstimationMateriauxFicheSolution | undefined,
) => {
  return ficheSolutionMateriaux?.map((materiau) => ({
    materiauId: `${materiau.id}`,
    quantite:
      defaultEstimationMateriaux?.estimationMateriaux?.find((e) => +e.materiauId == +materiau.id)?.quantite || 0,
  }));
};
