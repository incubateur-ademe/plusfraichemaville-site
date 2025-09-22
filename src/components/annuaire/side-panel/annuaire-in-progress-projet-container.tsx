import { GET_PUBLIC_PROJET_BY_ID } from "@/src/helpers/routes";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { AnnuaireInProgressProjetSkeleton } from "@/src/components/annuaire/side-panel/annuaire-in-progress-projet-skeleton";
import { AnnuaireInProgressProjetContent } from "@/src/components/annuaire/side-panel/annuaire-in-progress-projet-content";
import { useSidePanelFetcher } from "@/src/components/annuaire/hooks";

export const AnnuaireInProgressSidePanelContainer = ({ projetId }: { projetId: number }) => {
  const sidePanel = useSidePanelFetcher<ProjetWithPublicRelations>({
    url: GET_PUBLIC_PROJET_BY_ID(projetId),
    Skeleton: AnnuaireInProgressProjetSkeleton,
    Content: AnnuaireInProgressProjetContent,
  });
  return <>{sidePanel}</>;
};
