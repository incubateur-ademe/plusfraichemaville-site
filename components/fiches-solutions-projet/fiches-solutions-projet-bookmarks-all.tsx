import { useUserStore } from "@/stores/user";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { FichesSolutionProjetBookmarksConatiner } from "./fiches-solutions-projet-bookmarks-container";

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
  const filteredBookmarksIds = bookmarksIds.filter((bookmarkId) => !projetsFichesSolutionsIds.includes(bookmarkId));
  const sanitizedBookmarksIds = Array.from(new Set([...filteredBookmarksIds]));

  if (!bookmarksIds) {
    return null;
  }

  return (
    <FichesSolutionProjetBookmarksConatiner
      bookmarksIds={sanitizedBookmarksIds}
      projetsFichesSolutionsIds={projetsFichesSolutionsIds}
      projetNom={projetNom}
      updateStore={updateStore}
      projetId={projetId}
      title="Mes solutions mises en favoris"
      subtitle={`Cocher les solutions que vous souhaitez ajouter au projet ${projetNom}`}
    ></FichesSolutionProjetBookmarksConatiner>
  );
};
