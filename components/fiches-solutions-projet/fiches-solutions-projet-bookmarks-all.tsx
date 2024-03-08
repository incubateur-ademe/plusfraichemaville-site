import { useUserStore } from "@/stores/user/provider";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { FichesSolutionProjetBookmarksContainer } from "./fiches-solutions-projet-bookmarks-container";

export const FichesSolutionProjetBookmarksAll = ({
  projetNom,
  projetsFichesSolutionsIds,
  updateStore,
  projetId,
}: {
  projetNom: string;
  projetsFichesSolutionsIds: number[];
  updateStore: (_projet: ProjetWithCollectivite) => void;
  projetId?: number;
}) => {
  const bookmarkedFichesSolutionsIds = useUserStore((state) => state.bookmarkedFichesSolutions);
  const bookmarksIds = bookmarkedFichesSolutionsIds.map((bookmark) => bookmark.ficheSolutionIds).flat();

  if (!bookmarksIds) {
    return null;
  }

  return (
    <FichesSolutionProjetBookmarksContainer
      bookmarksIds={bookmarksIds}
      projetsFichesSolutionsIds={projetsFichesSolutionsIds}
      projetNom={projetNom}
      updateStore={updateStore}
      projetId={projetId}
      title="Mes solutions mises en favoris"
      subtitle={`Cocher les solutions que vous souhaitez ajouter au projet ${projetNom}`}
    ></FichesSolutionProjetBookmarksContainer>
  );
};
