import { useUserStore } from "@/stores/user";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { FichesSolutionProjetBookmarksConatiner } from "./fiches-solutions-projet-bookmarks-container";
const codeToLabelMap: { [code: string]: string } = {
  rondpoint: "Rond point",
  batiment: "Bâtiment",
  parking: "Parking",
  rue: "Rue",
  place: "Place",
  ecole: "Cour d'école",
  parc: "Espaces verts",
};

const getLabelFromCode = (code: string): string | undefined => {
  return codeToLabelMap[code];
};

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
  updateStore: (_projet: ProjetWithCollectivite) => void;
  projetId?: number;
}) => {
  const userFichesSolutions = useUserStore((state) => state.bookmarkedFichesSolutions);
  const label = getLabelFromCode(projetTypeEspace ?? "");
  const matchedFichesSolutions = userFichesSolutions.find((fiche) => fiche.projectName === label);
  const sanitizedFichesSolutions = matchedFichesSolutions?.ficheSolutionIds.filter(
    (ficheSolutionId) => !projetsFichesSolutionsIds.includes(ficheSolutionId),
  );

  if (!matchedFichesSolutions) {
    return null;
  }

  return (
    <FichesSolutionProjetBookmarksConatiner
      bookmarksIds={sanitizedFichesSolutions ?? []}
      projetsFichesSolutionsIds={projetsFichesSolutionsIds}
      projetNom={projetNom}
      updateStore={updateStore}
      projetId={projetId}
      title={`Ma sélection pour ${matchedFichesSolutions?.projectName}`}
      subtitle={`Cocher les solutions que vous souhaitez ajouter au projet ${projetNom}`}
    ></FichesSolutionProjetBookmarksConatiner>
  );
};
