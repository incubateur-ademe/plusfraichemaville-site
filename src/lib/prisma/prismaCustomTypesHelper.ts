import { EstimationMateriauxFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";

export const mapStrapiEstimationMateriauxToFormValues = (
  ficheSolutionMateriaux: Materiau[] | undefined,
  defaultEstimationMateriaux: EstimationMateriauxFicheSolution | undefined,
) => {
  return ficheSolutionMateriaux?.map((materiau) => ({
    materiauId: `${materiau.id}`,
    quantite:
      defaultEstimationMateriaux?.estimationMateriaux?.find((e) => +e.materiauId == +materiau.id)?.quantite || 0,
  }));
};
