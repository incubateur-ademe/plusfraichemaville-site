import { useProjetsStore } from "@/src/stores/projets/provider";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "../ficheSolution/helpers";
import { FicheSolutionCardWithFetcher } from "../ficheSolution/fiche-solution-card-with-fetcher";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const urls = projet?.fiches_solutions_id ?? [];

  const { data, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(
    makeFicheSolutionCompleteUrlApi(urls),
  );

  const fichesSolutions = data?.map((fs) => fs?.attributes.fiches_solutions_complementaires);

  const fichesSolutionsComplementaires = fichesSolutions?.reduce((acc, curr) => {
    if (curr && curr.data) {
      return acc.concat(curr.data);
    } else {
      return acc;
    }
  }, [] as FicheSolution[]);

  const filteredFichesSolutionsComplementaires = fichesSolutionsComplementaires?.filter(
    (currentElement, currentIndex, array) =>
      array.findIndex((element) => element.id === currentElement.id) === currentIndex,
  );

  if (!projet) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-8">
      <h1 className="mb-2 block text-[1.375rem] font-bold leading-snug text-dsfr-text-label-blue-france">
        Recommandations
      </h1>
      <p>
        Aucune solution ne peut résoudre seule la problématique de la surchauffe urbaine. <br /> Nous vous proposons ici
        des solutions complémentaires à celles que vous avez choisies afin de créer les meilleures combinaisons et
        synergies possibles.
      </p>
      {isLoading ? (
        <div className="flex gap-8">
          <FicheCardSkeleton />
          <FicheCardSkeleton />
          <FicheCardSkeleton />
        </div>
      ) : (
        filteredFichesSolutionsComplementaires?.map((fs) => (
          <FicheSolutionCardWithFetcher complete id={fs.id} key={fs?.id} projectName="" withoutModal />
        ))
      )}
    </div>
  );
};
