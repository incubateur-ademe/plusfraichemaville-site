import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolutionResponse } from "../ficheSolution/type";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";
import useSWRImmutable from "swr/immutable";

export const FichesSolutionsProjetsSelectedCard = ({
  ficheSolutionId,
}: {
  ficheSolutionId: FicheSolutionResponse["id"];
}) => {
  const { data } = useSWRImmutable(`ficheSolution-${ficheSolutionId}`, () =>
    getFicheSolutionById(ficheSolutionId.toString()),
  );

  if (!data) {
    return null;
  }
  return <FicheSolutionCardWithUserInfo ficheSolution={data} projectName="" />;
};
