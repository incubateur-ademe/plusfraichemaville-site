import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolutionResponse } from "../ficheSolution/type";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";
import { abortablePromise } from "@/helpers/abortable-promise";
import useSWRImmutable from "swr/immutable";
import { FicheSolutionFullCardSkeleton } from "../ficheSolution/fiche-solution-full-card-skeleton";

function useCancelableSWR(key: string, id: number) {
  const controller = new AbortController();
  const swr = useSWRImmutable(key, () => abortablePromise(getFicheSolutionById(id.toString()), controller.signal));
  return [swr, controller] as const;
}

export const FichesSolutionsProjetsSelectedCard = ({
  ficheSolutionId,
}: {
  ficheSolutionId: FicheSolutionResponse["id"];
}) => {
  const [{ data, isLoading }] = useCancelableSWR(`fiche-solution-${ficheSolutionId}`, ficheSolutionId);

  return !data && isLoading ? (
    <FicheSolutionFullCardSkeleton />
  ) : (
    data && <FicheSolutionCardWithUserInfo ficheSolution={data} projectName="" />
  );
};
