import { useProjetsStore } from "@/stores/projets/provider";

import useSWR from "swr";
import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  return (
    <div className="flex flex-wrap gap-8">
      {projet?.fiches_solutions_id.map((ficheSolutionId) => (
        <TableauDeBordRecommandationItem ficheSolutionId={ficheSolutionId} />
      ))}
    </div>
  );
};

const TableauDeBordRecommandationItem = ({ ficheSolutionId }: { ficheSolutionId: number }) => {
  const { data } = useSWR(ficheSolutionId.toString(), () => getFicheSolutionById(ficheSolutionId.toString()));
  return data?.attributes.fiches_solutions_complementaires?.data.map((fs) => (
    <FicheSolutionCardWithUserInfo ficheSolution={fs} key={fs.id} projectName="" />
  ));
};
