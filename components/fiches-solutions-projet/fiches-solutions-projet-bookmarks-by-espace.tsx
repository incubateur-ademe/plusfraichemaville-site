import { useUserStore } from "@/stores/user/provider";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { FichesSolutionProjetBookmarksContainer } from "./fiches-solutions-projet-bookmarks-container";
import { ALL_ESPACES } from "../filters/TypeEspaceFilter";

const getLabelFromCode = (code: string): string | undefined =>
  ALL_ESPACES.find((espace) => espace.code === code)?.label;

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
  const userFichesSolutions = useUserStore((state) => state.bookmarkedFichesSolutions);

  const label = getLabelFromCode(projetTypeEspace ?? "");
  const matchedFichesSolutions = userFichesSolutions.find((fiche) => fiche.projectName === label);

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
      title={`Ma sélection pour ${matchedFichesSolutions?.projectName}`}
      subtitle={`Cocher les solutions que vous souhaitez ajouter au projet ${projetNom}`}
    ></FichesSolutionProjetBookmarksContainer>
  );
};
