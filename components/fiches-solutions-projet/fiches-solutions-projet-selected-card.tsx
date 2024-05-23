import { FicheSolutionResponse } from "../ficheSolution/type";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";
import { FicheSolutionFullCardSkeleton } from "../ficheSolution/fiche-solution-full-card-skeleton";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { makeFicheSolutionUrlApi } from "../ficheSolution/helpers";
export const FichesSolutionsProjetsSelectedCard = ({
  ficheSolutionId,
}: {
  ficheSolutionId: FicheSolutionResponse["id"];
}) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(makeFicheSolutionUrlApi(ficheSolutionId));

  return !data && isLoading ? (
    <FicheSolutionFullCardSkeleton />
  ) : (
    data && <FicheSolutionCardWithUserInfo ficheSolution={data[0]} projectName="" />
  );
};
