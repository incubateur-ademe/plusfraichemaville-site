import { useProjetsStore } from "@/src/stores/projets/provider";
import { TypeFiche } from "@/src/helpers/common";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";

export const useRecommandationsForCurrentProjet = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const ficheSolutionIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution }) || [];

  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(
    makeFicheSolutionCompleteUrlApi(ficheSolutionIds),
  );

  const fichesSolutions = data?.map((fs) => fs?.fiches_solutions_complementaires);

  const fichesSolutionsComplementaires = fichesSolutions?.reduce((acc, curr) => {
    if (curr) {
      return acc.concat(curr);
    } else {
      return acc;
    }
  }, [] as FicheSolution[]);

  const deduplicatedFichesSolutionsComplementaires = fichesSolutionsComplementaires?.filter(
    (currentElement, currentIndex, array) =>
      array.findIndex((element) => element.documentId === currentElement.documentId) === currentIndex,
  );

  const recommandations =
    deduplicatedFichesSolutionsComplementaires?.filter(
      (currentElement) => ficheSolutionIds.findIndex((fsId) => fsId == currentElement.documentId) === -1,
    ) || [];

  return { recommandations, isLoading };
};
