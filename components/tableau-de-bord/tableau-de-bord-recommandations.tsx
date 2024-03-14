import { useProjetsStore } from "@/stores/projets/provider";
import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";

import useSWRImmutable from "swr/immutable";
import { useEffect, useMemo, useState } from "react";
import { FicheSolutionResponse } from "../ficheSolution/type";

const getUniqueFSComplementaires = (fichesSolutionsComplementaires: FicheSolutionResponse[]) =>
  Object.values(
    fichesSolutionsComplementaires.reduce<Record<string, FicheSolutionResponse>>((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {}),
  );

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const [fsComplementaires, setFSComplementaires] = useState<FicheSolutionResponse[]>([]);
  const updateFSComplementaires = (updates: FicheSolutionResponse[]) => setFSComplementaires(updates);
  const fichesSolutionsUniques = useMemo(() => getUniqueFSComplementaires(fsComplementaires), [fsComplementaires]);

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
      {fichesSolutionsUniques.map((fs) => (
        <FicheSolutionCardWithUserInfo ficheSolution={fs} key={fs.id} projectName="" />
      ))}
      {projet?.fiches_solutions_id.map((ficheSolutionId) => (
        <TableauDeBordRecommandationItem
          setFSComplementaires={updateFSComplementaires}
          ficheSolutionId={ficheSolutionId}
          key={ficheSolutionId}
        />
      ))}
    </div>
  );
};

const TableauDeBordRecommandationItem = ({
  ficheSolutionId,
  setFSComplementaires,
}: {
  ficheSolutionId: number;
  setFSComplementaires: (_updates: FicheSolutionResponse[]) => void;
}) => {
  const { data } = useSWRImmutable(`ficheSolution-${ficheSolutionId}`, () =>
    getFicheSolutionById(ficheSolutionId.toString()),
  );

  useEffect(() => {
    if (data && data.attributes.fiches_solutions_complementaires) {
      const arr = data.attributes.fiches_solutions_complementaires.data;
      setFSComplementaires(arr);
    }
  }, [data, setFSComplementaires]);

  return null;
};
