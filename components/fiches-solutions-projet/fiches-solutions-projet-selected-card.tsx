import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolutionResponse } from "../ficheSolution/type";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";
import { abortablePromise } from "@/helpers/abortable-promise";
import useSWRImmutable from "swr/immutable";
import { FicheSolutionFullCardSkeleton } from "../ficheSolution/fiche-solution-full-card-skeleton";
import { useEffect } from "react";

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
  const [{ data, isLoading, mutate }] = useCancelableSWR(`ficheSolution-${ficheSolutionId}`, ficheSolutionId);
  useEffect(() => {
    if (!data) {
      mutate();
    }
  }, [mutate, data]);

  return !data && isLoading ? (
    <FicheSolutionFullCardSkeleton />
  ) : (
    data && <FicheSolutionCardWithUserInfo ficheSolution={data} projectName="" />
  );
};
