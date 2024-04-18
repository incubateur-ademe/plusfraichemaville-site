import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolutionResponse } from "../ficheSolution/type";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";
import { useEffect } from "react";
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
  const [{ data, isLoading }, controller] = useCancelableSWR(`fiche-solution-${ficheSolutionId}`, ficheSolutionId);

  // const { data } = useSWRImmutable(`ficheSolution-${ficheSolutionId}`, () =>
  //   getFicheSolutionById(ficheSolutionId.toString()),
  // );

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, [controller]);

  if (!data) {
    return null;
  }
  return isLoading ? <FicheSolutionFullCardSkeleton /> : <FicheSolutionFullCardSkeleton />;
};
