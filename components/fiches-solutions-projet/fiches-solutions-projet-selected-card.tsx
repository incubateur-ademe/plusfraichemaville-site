import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import useSWR from "swr";
import FicheSolutionFullCard from "../ficheSolution/FicheSolutionFullCard";
import { ButtonSaveFicheSolutionInProjet } from "../ficheSolution/button-save-fiche-solution-in-projet";
import { FicheSolutionResponse } from "../ficheSolution/type";

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
  return (
    <div className="relative">
      <FicheSolutionFullCard ficheSolution={data.attributes} />
      <ButtonSaveFicheSolutionInProjet ficheSolutionId={ficheSolutionId} />
    </div>
  );
};
