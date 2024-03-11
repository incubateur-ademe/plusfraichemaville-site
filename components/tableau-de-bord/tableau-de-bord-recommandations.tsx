import { useProjetsStore } from "@/stores/projets/provider";
import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";
import { useCallback, useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

type FicheCounterState = {
  count: number;
};

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const [fichesCounter, setFichesCounter] = useState<FicheCounterState[]>([]);

  const addCount = useCallback((count: number) => {
    setFichesCounter((fichesCounter) => [...fichesCounter, { count }]);
  }, []);

  useEffect(() => {
    setFichesCounter([]);
  }, [projet]);

  useEffect(() => {
    const q = document.querySelector<HTMLAnchorElement>('[data-tab="recommandation"]');
    if (fichesCounter.length === projet?.fiches_solutions_id.length) {
      const totalCount = fichesCounter.reduce((acc, obj) => acc + obj.count, 0);

      q?.setAttribute("data-index", `${totalCount}`);
    }
  }, [fichesCounter, projet?.fiches_solutions_id.length]);

  if (!projet) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-8">
      {projet?.fiches_solutions_id.map((ficheSolutionId) => (
        <TableauDeBordRecommandationItem ficheSolutionId={ficheSolutionId} key={ficheSolutionId} addCount={addCount} />
      ))}
    </div>
  );
};

const TableauDeBordRecommandationItem = ({
  ficheSolutionId,
  addCount,
}: {
  ficheSolutionId: number;
  addCount: (_count: number) => void;
}) => {
  const { data } = useSWRImmutable(`ficheSolution-${ficheSolutionId}`, () =>
    getFicheSolutionById(ficheSolutionId.toString()),
  );
  useEffect(() => {
    if (data?.attributes.fiches_solutions_complementaires?.data) {
      addCount(data.attributes.fiches_solutions_complementaires.data.length);
    }
  }, [data, addCount]);
  return data?.attributes.fiches_solutions_complementaires?.data.map((fs) => (
    <FicheSolutionCardWithUserInfo ficheSolution={fs} key={fs.id} projectName="" />
  ));
};
