import { useProjetsStore } from "@/stores/projets/provider";
import { getFicheSolutionByIdsComplete } from "@/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";

import useSWR from "swr";

import { FicheSolutionResponse } from "../ficheSolution/type";
import { FicheSolutionFullCardSkeleton } from "../ficheSolution/fiche-solution-full-card-skeleton";

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const urls = projet?.fiches_solutions_id ?? [];

  const { data, isLoading } = useSWR(urls, () => getFicheSolutionByIdsComplete(urls), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const fichesSolutions = data?.map((fs) => fs?.attributes.fiches_solutions_complementaires);

  const fichesSolutionsComplementaires = fichesSolutions?.reduce((acc, curr) => {
    if (curr && curr.data) {
      return acc.concat(curr.data);
    } else {
      return acc;
    }
  }, [] as FicheSolutionResponse[]);

  const filteredFichesSolutionsComplementaires = fichesSolutionsComplementaires?.filter(
    (currentElement, currentIndex, array) =>
      array.findIndex((element) => element.id === currentElement.id) === currentIndex,
  );

  if (!projet) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-8">
      <p>
        <span className="block font-bold mb-2">Mes recommandations</span>
        Aucune solution ne peut résoudre seule la problématique de la surchauffe urbaine. <br /> Nous vous proposons ici
        des solutions complémentaires à celles que vous avez choisies afin de créer les meilleures combinaisons et
        synergies possibles.
      </p>
      {isLoading ? (
        <div className="flex gap-8">
          <FicheSolutionFullCardSkeleton />
          <FicheSolutionFullCardSkeleton />
          <FicheSolutionFullCardSkeleton />
        </div>
      ) : (
        filteredFichesSolutionsComplementaires?.map(
          (fs) => fs && <FicheSolutionCardWithUserInfo ficheSolution={fs} key={fs?.id} projectName="" withoutModal />,
        )
      )}
    </div>
  );
};
