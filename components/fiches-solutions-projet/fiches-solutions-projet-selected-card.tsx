import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import useSWR from "swr";
import { FicheSolutionResponse } from "../ficheSolution/type";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";

export const FichesSolutionsProjetsSelectedCard = ({
  ficheSolutionId,
}: {
  ficheSolutionId: FicheSolutionResponse["id"];
}) => {
  const swrKey = `ficheSolution-${ficheSolutionId}`;
  const fetcher = () => getFicheSolutionById(`${ficheSolutionId}`);
  const { data } = useSWR(swrKey, fetcher);

  if (!data) {
    return null;
  }
  return <FicheSolutionCardWithUserInfo ficheSolution={data} projectName="" />;
};
