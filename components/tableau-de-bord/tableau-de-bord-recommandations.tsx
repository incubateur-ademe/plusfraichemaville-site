import { useProjetsStore } from "@/stores/projets/provider";
import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";

import useSWRImmutable from "swr/immutable";

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

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
      {projet?.fiches_solutions_id.map((ficheSolutionId) => (
        <TableauDeBordRecommandationItem ficheSolutionId={ficheSolutionId} key={ficheSolutionId} />
      ))}
    </div>
  );
};

const TableauDeBordRecommandationItem = ({ ficheSolutionId }: { ficheSolutionId: number }) => {
  const { data } = useSWRImmutable(`ficheSolution-${ficheSolutionId}`, () =>
    getFicheSolutionById(ficheSolutionId.toString()),
  );

  return data?.attributes.fiches_solutions_complementaires?.data.map((fs) => (
    <FicheSolutionCardWithUserInfo ficheSolution={fs} key={fs.id} projectName="" />
  ));
};
