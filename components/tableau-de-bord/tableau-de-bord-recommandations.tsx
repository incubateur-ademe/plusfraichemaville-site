import { useProjetsStore } from "@/stores/projets/provider";
import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";

import useSWRImmutable from "swr/immutable";

import { FicheSolutionResponse } from "../ficheSolution/type";

const fetcher = (fichesIds: number[]) => {
  const f = (ficheId: number) => getFicheSolutionById(ficheId.toString());
  return Promise.all(fichesIds.map((ficheId) => f(ficheId)));
};

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const urls = projet?.fiches_solutions_id ?? [];
  const { data } = useSWRImmutable(urls, () => fetcher(urls));

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
      {filteredFichesSolutionsComplementaires?.map(
        (fs) => fs && <FicheSolutionCardWithUserInfo ficheSolution={fs} key={fs?.id} projectName="" />,
      )}
    </div>
  );
};
