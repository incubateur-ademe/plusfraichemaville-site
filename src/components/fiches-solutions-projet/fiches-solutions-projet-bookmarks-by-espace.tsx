import { useUserStore } from "@/src/stores/user/provider";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { FichesSolutionProjetBookmarksContainer } from "./fiches-solutions-projet-bookmarks-container";

import { FicheBookmarkedSolution } from "../common/generic-save-fiche/helpers";
import { ALL_ESPACES } from "@/src/helpers/type-espace-filter";

const getLabelFromCode = (code: string): string => ALL_ESPACES.find((espace) => espace.code === code)?.label || "";

export const FichesSolutionProjetBookmarksByEspace = ({
  projetNom,
  projetTypeEspace,
  projetsFichesSolutionsIds,
  updateStore,
  projetId,
}: {
  projetNom: string;
  projetTypeEspace: string;
  projetsFichesSolutionsIds: number[];
  updateStore: (_projet: ProjetWithRelations) => void;
  projetId?: number;
}) => {
  const userFichesSolutions = useUserStore(
    (state) => state.userInfos?.selection_fiches_solutions as FicheBookmarkedSolution[],
  );

  const label = getLabelFromCode(projetTypeEspace);
  const matchedFichesSolutions =
    userFichesSolutions && userFichesSolutions.find((fiche) => fiche.projectName === label);

  if (!matchedFichesSolutions) {
    return null;
  }

  return (
    <FichesSolutionProjetBookmarksContainer
      bookmarksIds={matchedFichesSolutions.ficheSolutionIds ?? []}
      projetsFichesSolutionsIds={projetsFichesSolutionsIds}
      projetNom={projetNom}
      updateStore={updateStore}
      projetId={projetId}
      title={
        matchedFichesSolutions.projectName
          ? `Ma sélection pour ${matchedFichesSolutions.projectName}`
          : "Mes solutions mises en favoris"
      }
      subtitle={`Cocher les solutions que vous souhaitez ajouter au projet ${projetNom}`}
    ></FichesSolutionProjetBookmarksContainer>
  );
};
